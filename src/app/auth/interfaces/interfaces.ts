export interface AuthResponse {
    message: string;
    status: boolean;
    token?: string;
    userData?: any;
}

export interface UserData{
    id?: string;
    email?: string;
    name: string;
    code: string;
}