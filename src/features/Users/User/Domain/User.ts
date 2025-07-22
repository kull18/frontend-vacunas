export interface User {
    username: string,
    password: string
    role:string,
    groupIdGroup: number,
    name: string,
    lastname: string,
}

export interface UserLogin { 
    username:string, 
    password:string 
}

export interface AuthResponse {
  token: string;
  body: User;
}

export type UserForm = Omit<User, "groupIdGroup">;