import { Typography } from "@material-ui/core";
import { Component } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import CouponModel from "../../../Models/CouponModel";
import UserModel from "../../../Models/UserModel";
import { companyDownloadedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import CouponCard from "../CouponCard/CouponCard";
import "./CouponsListForCompany.css";

interface CouponsListForCompanyState {
    coupons: CouponModel[];
}

class CouponsListForCompany extends Component<{}, CouponsListForCompanyState> {

    public constructor(props: {}) {
        super(props);
        this.state = { coupons: store.getState().companyAppState.company?.coupons };
    }

    public async componentDidMount() {
        try {
            if (store.getState().companyAppState.company === null) {
                const id: number = (JSON.parse(localStorage.getItem("coupon-system-user")) as UserModel).id;
                const response = await jwtAxios.get<CompanyModel>(globalConfigs.urls.company + id + "/get/details");
                this.setState({ coupons: response.data.coupons });
                store.dispatch(companyDownloadedAction(response.data));
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponsListForCompany">
                <Typography variant="h4">Coupons List ({this.state.coupons?.length})</Typography>
                <div>
                    {
                        this.state.coupons?.length === 0 &&
                        <Typography variant="body1" paragraph>
                            <br />
                            <em> --- There are no coupons to display. Please post some first ;) --- </em>
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

export default CouponsListForCompany;
