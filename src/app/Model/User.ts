export interface User {
    id: number;
    userName: String;
    password: String;
    firstName: String;
    lastName: String;
    contactNumber: number;
    regCode: String;
    role: String;
    active: boolean;
    confirmedSignUp: boolean;
    resetPassword: boolean;
    resetPasswordDate: Date;
}