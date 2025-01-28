export interface IUserCredentials<T>{
    operationType:string
    providerId:unknown
    user: T
}
export interface IUserRes{
    accessToken:string
    uid:string
    email:string
}