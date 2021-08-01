import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";

export class CompanyAppState {
    company: CompanyModel = null;
}

export enum CompanyActionType {
    CompanyDownloaded = "CompanyDownloaded",
    CompanyCouponAdded = "CompanyCouponAdded",
    CompanyCouponUpdated = "CompanyCouponUpdated",
    CompanyCouponDeleted = "CompanyCouponDeleted"
}

export interface CompanyAction {
    type: CompanyActionType;
    payload: any;
}

export function companyDownloadedAction(company: CompanyModel): CompanyAction {
    return { type: CompanyActionType.CompanyDownloaded, payload: company };
}
export function companyCouponAddedAction(coupon: CouponModel): CompanyAction {
    return { type: CompanyActionType.CompanyCouponAdded, payload: coupon };
}
export function companyCouponUpdatedAction(coupon: CouponModel): CompanyAction {
    return { type: CompanyActionType.CompanyCouponUpdated, payload: coupon };
}
export function companyCouponDeletedAction(id: number): CompanyAction {
    return { type: CompanyActionType.CompanyCouponDeleted, payload: id };
}

export function companyReducer(currentState: CompanyAppState = new CompanyAppState(), action: CompanyAction): CompanyAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case CompanyActionType.CompanyDownloaded:
            newState.company = action.payload;
            break;
        case CompanyActionType.CompanyCouponAdded:
            newState.company.coupons.push(action.payload);
            break;
        case CompanyActionType.CompanyCouponUpdated:
            const updatedCoupon: CouponModel = action.payload;
            const index: number = newState.company.coupons.findIndex(e => e.id === updatedCoupon.id);
            newState.company.coupons[index] = { ...updatedCoupon };
            break;
        case CompanyActionType.CompanyCouponDeleted:
            newState.company.coupons.splice(newState.company.coupons.findIndex(e => e.id === action.payload), 1);
            break;
    }

    return newState;
}
