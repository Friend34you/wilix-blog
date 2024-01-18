export type FieldType = {
    username?: string;
    password?: string;
    email?: string;
}

export enum AuthTypes {
    REGISTRATION = "REGISTRATION",
    AUTHORIZATION = "AUTHORIZATION"
}