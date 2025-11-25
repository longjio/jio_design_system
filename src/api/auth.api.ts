// src/api/auth.api.ts
// 인증 관련 API 함수들

import { supabase } from './supabase';
import { LoginCredentials, SignUpCredentials, AuthResponse, User } from '../types';

/**
 * 이메일/비밀번호로 로그인
 */
export const login = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { user: null, error: error.message };
        }

        const user: User = {
            id: data.user?.id || '',
            email: data.user?.email || '',
            name: data.user?.user_metadata?.name,
            createdAt: data.user?.created_at,
        };

        return { user, error: null };
    } catch (err) {
        return { user: null, error: '로그인 중 오류가 발생했습니다.' };
    }
};

/**
 * 회원가입
 */
export const signUp = async ({ email, password, name }: SignUpCredentials): Promise<AuthResponse> => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (error) {
            return { user: null, error: error.message };
        }

        const user: User = {
            id: data.user?.id || '',
            email: data.user?.email || '',
            name: data.user?.user_metadata?.name,
            createdAt: data.user?.created_at,
        };

        return { user, error: null };
    } catch (err) {
        return { user: null, error: '회원가입 중 오류가 발생했습니다.' };
    }
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<{ error: string | null }> => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { error: error.message };
        }
        return { error: null };
    } catch (err) {
        return { error: '로그아웃 중 오류가 발생했습니다.' };
    }
};

/**
 * 현재 사용자 정보 가져오기
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        return {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name,
            createdAt: user.created_at,
        };
    } catch (err) {
        return null;
    }
};

/**
 * 인증 상태 변경 리스너
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return supabase.auth.onAuthStateChange((_event: string, session: { user: { id: string; email?: string; user_metadata?: { name?: string }; created_at?: string } } | null) => {
        if (session?.user) {
            callback({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name,
                createdAt: session.user.created_at,
            });
        } else {
            callback(null);
        }
    });
};
