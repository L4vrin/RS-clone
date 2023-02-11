export interface IUserCreate {
  email: string;
  password: string;
  fullName: string;
}

export interface IErrorValidation {
  location: string;
  msg: string;
  param: string;
  value: string;
}