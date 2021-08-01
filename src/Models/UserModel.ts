import { ClientType } from "./CredentialsModel";

export default class UserModel {
    public id: number;
    public name: string;
    public email: string;
    public clientType: ClientType;
    public token: string;
}
