// src/contexts/PermissionContext.tsx
// 메뉴 권한 관리 Context

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { permissionApi } from '../api';
import { useAuth } from './AuthContext';

interface PermissionContextType {
    deniedMenuIds: string[];
    isLoading: boolean;
    canAccess: (menuId: string) => boolean;
    refreshPermissions: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [deniedMenuIds, setDeniedMenuIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPermissions = useCallback(async () => {
        if (!user?.role) {
            setDeniedMenuIds([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        // 접근 불가 목록을 가져옴 (기본값은 모두 허용)
        const { menuIds, error } = await permissionApi.getDeniedMenuIds(user.role);

        if (!error) {
            setDeniedMenuIds(menuIds);
        }

        setIsLoading(false);
    }, [user?.role]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const canAccess = useCallback((menuId: string): boolean => {
        // 로딩 중이면 기본 허용
        if (isLoading) {
            return true;
        }
        // 거부 목록에 있으면 접근 불가
        return !deniedMenuIds.includes(menuId);
    }, [deniedMenuIds, isLoading]);

    const refreshPermissions = useCallback(async () => {
        await fetchPermissions();
    }, [fetchPermissions]);

    return (
        <PermissionContext.Provider value={{ deniedMenuIds, isLoading, canAccess, refreshPermissions }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = (): PermissionContextType => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermission must be used within a PermissionProvider');
    }
    return context;
};
