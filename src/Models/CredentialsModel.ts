export default class CredentialsModel {
    public email: string;
    public password: string;
    public clientType: ClientType;
}

export enum ClientType {
    ADMINISTRATOR = "ADMINISTRATOR",
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER"
}