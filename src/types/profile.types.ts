// src/types/profile.types.ts
// 프로필(사용자 관리) 관련 타입 정의

export interface Profile {
    id: string;
    email: string | null;
    name: string | null;
    department: string | null;
    company: string | null;
    role: string | null;
    is_active: boolean;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProfileUpdate {
    name?: string;
    department?: string;
    company?: string;
    role?: string;
    is_active?: boolean;
    description?: string;
}

export interface ProfilesResponse {
    profiles: Profile[];
    error: string | null;
}

export interface ProfileResponse {
    profile: Profile | null;
    error: string | null;
}
