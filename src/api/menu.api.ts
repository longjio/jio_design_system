// src/api/menu.api.ts
// 메뉴 및 메뉴 OBJ 관리 API 함수들

import { supabase } from './supabase';
import {
    Menu,
    MenuInput,
    MenusResponse,
    MenuResponse,
    MenuObject,
    MenuObjectInput,
    MenuObjectsResponse,
    MenuObjectResponse,
} from '../types';

// ==================== 메뉴 API ====================

/**
 * 전체 메뉴 목록 조회
 */
export const getMenus = async (): Promise<MenusResponse> => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('depth')
            .order('sort_order');

        if (error) {
            return { menus: [], error: error.message };
        }

        return { menus: data || [], error: null };
    } catch (err) {
        return { menus: [], error: '메뉴 목록 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 단일 메뉴 조회
 */
export const getMenu = async (id: string): Promise<MenuResponse> => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return { menu: null, error: error.message };
        }

        return { menu: data, error: null };
    } catch (err) {
        return { menu: null, error: '메뉴 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 생성
 */
export const createMenu = async (input: MenuInput): Promise<MenuResponse> => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .insert({
                ...input,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            return { menu: null, error: error.message };
        }

        return { menu: data, error: null };
    } catch (err) {
        return { menu: null, error: '메뉴 생성 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 수정
 */
export const updateMenu = async (id: string, input: Partial<MenuInput>): Promise<MenuResponse> => {
    try {
        const { data, error } = await supabase
            .from('menus')
            .update({
                ...input,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { menu: null, error: error.message };
        }

        return { menu: data, error: null };
    } catch (err) {
        return { menu: null, error: '메뉴 수정 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 삭제
 */
export const deleteMenu = async (id: string): Promise<{ success: boolean; error: string | null }> => {
    try {
        const { error } = await supabase
            .from('menus')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '메뉴 삭제 중 오류가 발생했습니다.' };
    }
};

// ==================== 메뉴 오브젝트 API ====================

/**
 * 특정 메뉴의 오브젝트 목록 조회
 */
export const getMenuObjects = async (menuId: string, objType?: 'basic' | 'additional'): Promise<MenuObjectsResponse> => {
    try {
        let query = supabase
            .from('menu_objects')
            .select('*')
            .eq('menu_id', menuId)
            .order('sort_order');

        if (objType) {
            query = query.eq('obj_type', objType);
        }

        const { data, error } = await query;

        if (error) {
            return { objects: [], error: error.message };
        }

        return { objects: data || [], error: null };
    } catch (err) {
        return { objects: [], error: '메뉴 오브젝트 목록 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 단일 메뉴 오브젝트 조회
 */
export const getMenuObject = async (id: string): Promise<MenuObjectResponse> => {
    try {
        const { data, error } = await supabase
            .from('menu_objects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return { object: null, error: error.message };
        }

        return { object: data, error: null };
    } catch (err) {
        return { object: null, error: '메뉴 오브젝트 조회 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 오브젝트 생성
 */
export const createMenuObject = async (input: MenuObjectInput): Promise<MenuObjectResponse> => {
    try {
        const { data, error } = await supabase
            .from('menu_objects')
            .insert({
                ...input,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            return { object: null, error: error.message };
        }

        return { object: data, error: null };
    } catch (err) {
        return { object: null, error: '메뉴 오브젝트 생성 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 오브젝트 수정
 */
export const updateMenuObject = async (id: string, input: Partial<MenuObjectInput>): Promise<MenuObjectResponse> => {
    try {
        const { data, error } = await supabase
            .from('menu_objects')
            .update({
                ...input,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { object: null, error: error.message };
        }

        return { object: data, error: null };
    } catch (err) {
        return { object: null, error: '메뉴 오브젝트 수정 중 오류가 발생했습니다.' };
    }
};

/**
 * 메뉴 오브젝트 삭제
 */
export const deleteMenuObject = async (id: string): Promise<{ success: boolean; error: string | null }> => {
    try {
        const { error } = await supabase
            .from('menu_objects')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '메뉴 오브젝트 삭제 중 오류가 발생했습니다.' };
    }
};
