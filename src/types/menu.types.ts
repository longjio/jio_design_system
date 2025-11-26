// src/types/menu.types.ts
// 메뉴 및 메뉴 OBJ 관련 타입 정의

/**
 * 메뉴 테이블 타입
 */
export interface Menu {
    id: string;
    menu_name: string;
    parent_id: string | null;
    depth: number;
    sort_order: number;
    path: string | null;
    icon: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * 메뉴 오브젝트 타입 (기본 OBJ / 추가 OBJ)
 */
export interface MenuObject {
    id: string;
    menu_id: string;
    object_name: string;
    action_url: string;
    action_type: 'C' | 'R' | 'U' | 'D';  // Create, Read, Update, Delete
    sort_order: number;
    log_yn: boolean;
    obj_type: 'basic' | 'additional';  // 기본 OBJ / 추가 OBJ 구분
    created_at: string;
    updated_at: string;
}

/**
 * 메뉴 생성/수정 요청 타입
 */
export interface MenuInput {
    menu_name: string;
    parent_id: string | null;
    depth: number;
    sort_order: number;
    path: string | null;
    icon: string | null;
    is_active: boolean;
}

/**
 * 메뉴 오브젝트 생성/수정 요청 타입
 */
export interface MenuObjectInput {
    menu_id: string;
    object_name: string;
    action_url: string;
    action_type: 'C' | 'R' | 'U' | 'D';
    sort_order: number;
    log_yn: boolean;
    obj_type: 'basic' | 'additional';
}

/**
 * 메뉴 목록 응답 타입
 */
export interface MenusResponse {
    menus: Menu[];
    error: string | null;
}

/**
 * 단일 메뉴 응답 타입
 */
export interface MenuResponse {
    menu: Menu | null;
    error: string | null;
}

/**
 * 메뉴 오브젝트 목록 응답 타입
 */
export interface MenuObjectsResponse {
    objects: MenuObject[];
    error: string | null;
}

/**
 * 단일 메뉴 오브젝트 응답 타입
 */
export interface MenuObjectResponse {
    object: MenuObject | null;
    error: string | null;
}
