export interface Auth {
    email: string,
    password: string,
}

export interface authResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean
}

export interface IAuthUser{
    email: string,
    userID: string,
    token: string,
    expiresIn: number
}