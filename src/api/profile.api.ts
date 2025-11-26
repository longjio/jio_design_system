// src/api/profile.api.ts
// 프로필(사용자) 관리 API 함수들

import { supabase } from './supabase';
import { Profile, ProfileUpdate, ProfilesResponse, ProfileResponse } from '../types';

/**
 * 모든 프로필 목록 조회
 */
export const getProfiles = async (): Promise<ProfilesResponse> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return { profiles: [], error: error.message };
        }

        return { profiles: data || [], error: null };
    } catch (err) {
        return { profiles: [], error: '프로필 목록 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 프로필 검색 (이름 또는 이메일로)
 */
export const searchProfiles = async (searchTerm: string): Promise<ProfilesResponse> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
            .order('created_at', { ascending: false });

        if (error) {
            return { profiles: [], error: error.message };
        }

        return { profiles: data || [], error: null };
    } catch (err) {
        return { profiles: [], error: '프로필 검색 중 오류가 발생했습니다.' };
    }
};

/**
 * 단일 프로필 조회
 */
export const getProfile = async (id: string): Promise<ProfileResponse> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return { profile: null, error: error.message };
        }

        return { profile: data, error: null };
    } catch (err) {
        return { profile: null, error: '프로필 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 프로필 수정
 */
export const updateProfile = async (id: string, updates: ProfileUpdate): Promise<ProfileResponse> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { profile: null, error: error.message };
        }

        return { profile: data, error: null };
    } catch (err) {
        return { profile: null, error: '프로필 수정 중 오류가 발생했습니다.' };
    }
};

/**
 * 프로필 활성화/비활성화
 */
export const toggleProfileActive = async (id: string, isActive: boolean): Promise<ProfileResponse> => {
    return updateProfile(id, { is_active: isActive });
};
