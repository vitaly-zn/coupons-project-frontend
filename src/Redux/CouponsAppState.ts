import CouponModel from "../Models/CouponModel";

// AppState
export class CouponsAppState {
    public coupons: CouponModel[] = [];
}

// Action Types
export enum CouponsActionType {
    CouponsDownloaded = "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

// Action
export interface CouponAction {
    type: CouponsActionType;
    payload: any;
}

// Action Creators
export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

// Reducers
export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(), action: CouponAction): CouponsAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case CouponsActionType.CouponsDownloaded:
            newState.coupons = action.payload;
            break;
    }

    return newState;
}