export interface User {
    email: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface AuthResponse {
    token: string
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean; // Thêm dòng này để Navbar kiểm tra
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}