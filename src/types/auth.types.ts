// src/types/auth.types.ts

export interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    avatar?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface AuthResponse {
    user: User | null;
    error: string | null;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
