// src/types/permission.types.ts
// 권한 관련 타입 정의

export interface MenuPermission {
    id: string;
    role: string;
    menu_id: string;
    can_access: boolean;
    created_at: string;
    updated_at: string;
}

export interface MenuPermissionsResponse {
    permissions: MenuPermission[];
    error: string | null;
}

export interface MenuPermissionUpdate {
    role: string;
    menu_id: string;
    can_access: boolean;
}
