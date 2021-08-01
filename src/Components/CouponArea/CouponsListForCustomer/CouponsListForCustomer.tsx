import { Typography } from "@material-ui/core";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import CustomerModel from "../../../Models/CustomerModel";
import UserModel from "../../../Models/UserModel";
import { customerDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import CouponCard from "../CouponCard/CouponCard";
import "./CouponsListForCustomer.css";

interface CouponsListForCustomerState {
    coupons: CouponModel[];
}

class CouponsListForCustomer extends Component<{}, CouponsListForCustomerState> {

    public constructor(props: {}) {
        super(props);
        this.state = { coupons: store.getState().customerAppState.customer?.coupons };
    }

    public async componentDidMount() {
        try {
            if (store.getState().customerAppState.customer === null) {
                const id: number = (JSON.parse(localStorage.getItem("coupon-system-user")) as UserModel).id;
                const response = await jwtAxios.get<CustomerModel>(globalConfigs.urls.customer + id + "/get/details");
                this.setState({ coupons: response.data.coupons });
                store.dispatch(customerDownloadedAction(response.data));
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponsListForCustomer">
                <Typography variant="h4">Coupons List ({this.state.coupons?.length})</Typography>
                <div>
                    {
                        this.state.coupons?.length === 0 &&
                        <Typography variant="body1" paragraph>
                            <br />
                            <em> --- There are no coupons to display. Please purchase some first ;) --- </em>
                        </Typography>
                    }
                    {
                        this.state.coupons?.map(e => <CouponCard coupon={e} key={e.id} />)
                    }
                </div>
            </div>
        );
    }
}

export default CouponsListForCustomer;
