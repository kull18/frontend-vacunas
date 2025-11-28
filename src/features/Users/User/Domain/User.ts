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


export interface UserCivil {
  idUserCivil: number;
  name: string;
  firstLastname: string;
  secondLastname: string;
  CURP: string;
  fol: string;
}


export interface CreateAccountData {
  username: string;
  password: string;
  role: string;
  name: string;
  lastname: string;
  idUserCivil: string;
}


export type UserForm = User