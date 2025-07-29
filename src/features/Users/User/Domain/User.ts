export interface User {
    idUser: number
    username: string,
    password: string
    role:string,
    groupIdGroup: number | null,
    name: string,
    lastname: string,
    groupName?: string;
}

export interface UserLogin { 
    username:string, 
    password:string 
}

export interface AuthResponse {
  token: string;
  body: User;
}

export type UserForm = User