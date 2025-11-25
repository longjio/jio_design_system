// src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { User, LoginCredentials, SignUpCredentials } from '../types';

// Context가 제공할 값들의 타입을 정의합니다.
interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<{ error: string | null }>;
    signup: (credentials: SignUpCredentials) => Promise<{ error: string | null }>;
    logout: () => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // 앱 시작 시 Supabase 세션 확인
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authApi.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        // 인증 상태 변경 리스너
        const { data: { subscription } } = authApi.onAuthStateChange((user) => {
            setUser(user);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            const { user: loggedInUser, error } = await authApi.login(credentials);

            if (error) {
                return { error };
            }

            setUser(loggedInUser);
            navigate('/app');
            return { error: null };
        } catch (error) {
            console.error('Login failed:', error);
            return { error: '로그인 중 오류가 발생했습니다.' };
        }
    }, [navigate]);

    const signup = useCallback(async (credentials: SignUpCredentials) => {
        try {
            const { user: newUser, error } = await authApi.signUp(credentials);

            if (error) {
                return { error };
            }

            // 회원가입 성공 시 (이메일 확인이 필요할 수 있음)
            if (newUser) {
                setUser(newUser);
            }
            return { error: null };
        } catch (error) {
            console.error('Signup failed:', error);
            return { error: '회원가입 중 오류가 발생했습니다.' };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [navigate]);

    const isAuthenticated = useMemo(() => !!user, [user]);

    // Context 값을 memoization하여 불필요한 리렌더링을 방지합니다.
    const value = useMemo(() => ({
        user,
        login,
        signup,
        logout,
        isLoading,
        isAuthenticated,
    }), [user, login, signup, logout, isLoading, isAuthenticated]);

    // 인증 상태 확인 중에는 로딩 표시
    if (isLoading) {
        return null; // 또는 전체 화면 로딩 스피너를 보여줄 수 있습니다.
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
