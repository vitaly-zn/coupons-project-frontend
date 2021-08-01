import { Typography } from "@material-ui/core";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import CouponCard from "../CouponCard/CouponCard";
import "./AllAvailableCoupons.css";

interface AllAvailableCouponsState {
    coupons: CouponModel[];
}

class AllAvailableCoupons extends Component<{}, AllAvailableCouponsState> {

    public constructor(props: {}) {
        super(props);
        this.state = { coupons: store.getState().couponsAppState.coupons };
    }

    public async componentDidMount() {
        if (store.getState().couponsAppState.coupons.length === 0) {
            const response = await jwtAxios.get<CouponModel[]>(globalConfigs.urls.customer + "get/coupon/all");
            this.setState({ coupons: response.data });
            store.dispatch(couponsDownloadedAction(response.data));
        }
    }

    public render(): JSX.Element {

        return (
            <div className="AllAvailableCoupons">
                <Typography variant="h4">All Available Coupons ({this.state.coupons.length})</Typography>
                <div>
                    {
                        this.state.coupons?.length === 0 &&
                        <Typography variant="body1" paragraph>
                            There are no coupons to display. Please add some first ;)
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

export default AllAvailableCoupons;
