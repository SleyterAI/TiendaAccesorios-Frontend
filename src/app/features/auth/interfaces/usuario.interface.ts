
export interface Usuario{
  id?:number;
  username:string;
  email:string;
  password:string;
  role:string;
}

export interface RegistroRequestDto{
  username:string;
  email:string;
  password:string;
}

export interface RegistroResponseDto{
  message:string;
}

//admin tabla
export interface UsuarioRequestDto{
  id:number;
  username:string;
  email:string;
  role:string;
}

export interface UsuarioResponseDto{

}
