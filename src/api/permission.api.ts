// src/api/permission.api.ts
// 메뉴 권한 관리 API 함수들

import { supabase } from './supabase';
import { MenuPermission, MenuPermissionsResponse, MenuPermissionUpdate } from '../types';

/**
 * 특정 역할의 메뉴 권한 목록 조회
 */
export const getPermissionsByRole = async (role: string): Promise<MenuPermissionsResponse> => {
    try {
        const { data, error } = await supabase
            .from('menu_permissions')
            .select('*')
            .eq('role', role);

        if (error) {
            return { permissions: [], error: error.message };
        }

        return { permissions: data || [], error: null };
    } catch (err) {
        return { permissions: [], error: '권한 목록 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 모든 권한 목록 조회
 */
export const getAllPermissions = async (): Promise<MenuPermissionsResponse> => {
    try {
        const { data, error } = await supabase
            .from('menu_permissions')
            .select('*')
            .order('role')
            .order('menu_id');

        if (error) {
            return { permissions: [], error: error.message };
        }

        return { permissions: data || [], error: null };
    } catch (err) {
        return { permissions: [], error: '권한 목록 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 특정 역할이 접근 가능한 메뉴 ID 목록 조회
 */
export const getAccessibleMenuIds = async (role: string): Promise<{ menuIds: string[]; error: string | null }> => {
    try {
        const { data, error } = await supabase
            .from('menu_permissions')
            .select('menu_id')
            .eq('role', role)
            .eq('can_access', true);

        if (error) {
            return { menuIds: [], error: error.message };
        }

        const menuIds = data?.map((item: { menu_id: string }) => item.menu_id) || [];
        return { menuIds, error: null };
    } catch (err) {
        return { menuIds: [], error: '접근 가능한 메뉴 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 특정 역할이 접근 불가한 메뉴 ID 목록 조회
 */
export const getDeniedMenuIds = async (role: string): Promise<{ menuIds: string[]; error: string | null }> => {
    try {
        const { data, error } = await supabase
            .from('menu_permissions')
            .select('menu_id')
            .eq('role', role)
            .eq('can_access', false);

        if (error) {
            return { menuIds: [], error: error.message };
        }

        const menuIds = data?.map((item: { menu_id: string }) => item.menu_id) || [];
        return { menuIds, error: null };
    } catch (err) {
        return { menuIds: [], error: '접근 불가 메뉴 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 권한 수정 (upsert)
 */
export const updatePermission = async (permission: MenuPermissionUpdate): Promise<{ success: boolean; error: string | null }> => {
    try {
        const { error } = await supabase
            .from('menu_permissions')
            .upsert({
                role: permission.role,
                menu_id: permission.menu_id,
                can_access: permission.can_access,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'role,menu_id'
            });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '권한 수정 중 오류가 발생했습니다.' };
    }
};

/**
 * 여러 권한 일괄 수정
 */
export const updatePermissions = async (permissions: MenuPermissionUpdate[]): Promise<{ success: boolean; error: string | null }> => {
    try {
        const updates = permissions.map(p => ({
            role: p.role,
            menu_id: p.menu_id,
            can_access: p.can_access,
            updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase
            .from('menu_permissions')
            .upsert(updates, {
                onConflict: 'role,menu_id'
            });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '권한 일괄 수정 중 오류가 발생했습니다.' };
    }
};
