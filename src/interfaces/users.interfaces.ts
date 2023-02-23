export interface IUserRequest {
    id: number,
    name: string,
    email: string,
    password: string,
    admin: boolean,
    active: boolean
}

export type IUserWithoutPassword = Omit<IUserRequest, "password">