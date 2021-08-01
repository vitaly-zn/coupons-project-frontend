import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";

export class CustomerAppState {
    customer: CustomerModel = null;
}

export enum CustomerActionType {
    CustomerDownloaded = "CustomerDownloaded",
    CustomerMadePurchase = "CustomerMadePurchase"
}

export interface CustomerAction {
    type: CustomerActionType;
    payload: any;
}

export function customerDownloadedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.CustomerDownloaded, payload: customer };
}
export function customerMadePurchaseAction(coupon: CouponModel): CustomerAction {
    return { type: CustomerActionType.CustomerMadePurchase, payload: coupon };
}

export function customerReducer(currentState: CustomerAppState = new CustomerAppState(), action: CustomerAction): CustomerAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case CustomerActionType.CustomerDownloaded:
            newState.customer = action.payload;
            break;
        case CustomerActionType.CustomerMadePurchase:
            newState.customer.coupons.push(action.payload);
            break;
    }

    return newState;
}
