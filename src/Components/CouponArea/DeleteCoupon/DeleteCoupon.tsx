import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { companyCouponDeletedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";

interface RouteParams {
    id: string;
}

interface DeleteCouponProps extends RouteComponentProps<RouteParams> {

}

class DeleteCoupon extends Component<DeleteCouponProps> {

    public constructor(props: DeleteCouponProps) {
        super(props);
    }

    public async componentDidMount() {
        try {
            const id: number = +this.props.match.params.id;
            const response = await jwtAxios.delete<CouponModel>(globalConfigs.urls.company + "delete/coupon?id=" + id);
            const deletedCoupon = response.data;
            store.dispatch(companyCouponDeletedAction(id));
            notify.success("Coupon " + deletedCoupon.title + " was deleted");
            this.props.history.push("/company/" + store.getState().authAppState.user.id + "/get/coupon/all");
        } catch (err) {
            notify.error(err);
            this.props.history.goBack();
        }
    }

    public render(): JSX.Element {
        return null;
    }
}

export default DeleteCoupon;
