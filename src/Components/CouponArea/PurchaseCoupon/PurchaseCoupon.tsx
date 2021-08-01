import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { customerMadePurchaseAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";

interface RouteParams {
    id: string;
}

interface PurchaseCouponProps extends RouteComponentProps<RouteParams> {

}

class PurchaseCoupon extends Component<PurchaseCouponProps> {

    public constructor(props: PurchaseCouponProps) {
        super(props);
    }

    public async componentDidMount() {
        try {
            const couponId: number = +this.props.location.state;
            const customerId: number = +this.props.match.params.id;
            let couponToPurchase: CouponModel = store.getState().customerAppState.customer?.coupons.find(c => c.id === couponId);

            if (!couponToPurchase) {
                const resp = await jwtAxios.get<CouponModel>(globalConfigs.urls.customer + "get/coupon?id=" + couponId);
                couponToPurchase = resp.data;
            }

            const response = await jwtAxios.put<CouponModel>(globalConfigs.urls.customer + customerId + "/purchase/", couponToPurchase);
            const purchasedCoupon: CouponModel = response.data;
            store.dispatch(customerMadePurchaseAction(purchasedCoupon));

            if (store.getState().couponsAppState.coupons.length > 0) {
                const index = store.getState().couponsAppState.coupons.findIndex(e => e.id === purchasedCoupon.id);
                if (index !== -1) { }
                store.getState().couponsAppState.coupons[index] = { ...purchasedCoupon };
            }

            notify.success("Thank you for purchasing \"" + purchasedCoupon.title + "\" coupon");
            this.props.history.push("/customer/" + customerId + "/get/coupon/all");
        } catch (err) {
            notify.error(err);
            this.props.history.goBack();
        }
    }

    public render(): JSX.Element {
        return null;
    }
}

export default PurchaseCoupon;
