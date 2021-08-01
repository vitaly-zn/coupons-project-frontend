
export default class CouponModel {
    public id: number;
    public companyId: number;
    public category: Category;
    public title: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public amount: number;
    public price: number;
    public image: string;
    public imageFile: FileList;
    public token: string;
}

export enum Category {
    SPORT = "SPORT",
    ELECTRICITY = "ELECTRICITY",
    RESTAURANT = "RESTAURANT",
    VACATION = "VACATION",
    HEALTHY = "HEALTHY",
    CLOTHING = "CLOTHING",
    EDUCATION = "EDUCATION"
}