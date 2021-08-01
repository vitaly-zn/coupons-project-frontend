import { Button, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import imageNotAvailable from "../../../Assets/Images/Status/no_image_available.png";
import CompanyModel from "../../../Models/CompanyModel";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import CustomerModel from "../../../Models/CustomerModel";
import UserModel from "../../../Models/UserModel";
import { companyDownloadedAction } from "../../../Redux/CompanyAppState";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { customerDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./CouponDetails.css";

interface RouteParams {
    id: string;
}

interface CouponDetailsProps extends RouteComponentProps<RouteParams> {

}

interface CouponDetailsState {
    coupon: CouponModel;
}

class CouponDetails extends Component<CouponDetailsProps, CouponDetailsState> {

    public constructor(props: CouponDetailsProps) {
        super(props);
        if (store.getState().authAppState.user.clientType === ClientType.COMPANY) {
            this.state = { coupon: store.getState().companyAppState.company?.coupons.find(c => c.id === +this.props.match.params.id) };
        } else if (store.getState().authAppState.user.clientType === ClientType.CUSTOMER) {
            if (store.getState().couponsAppState.coupons?.length === 0) {
                this.state = { coupon: store.getState().customerAppState.customer?.coupons.find(c => c.id === +this.props.match.params.id) };
            } else {
                this.state = { coupon: store.getState().couponsAppState.coupons.find(c => c.id === +this.props.match.params.id) };
            }
        }
    }

    public async componentDidMount() {
        try {
            const user: UserModel = JSON.parse(localStorage.getItem("coupon-system-user"));
            if (user.clientType === ClientType.COMPANY) {
                if (store.getState().companyAppState.company === null) {
                    const response = await jwtAxios.get<CompanyModel>(globalConfigs.urls.company + user.id + "/get/details");
                    this.setState({ coupon: response.data.coupons.find(e => e.id === +this.props.match.params.id) });
                    store.dispatch(companyDownloadedAction(response.data));
                }
            } else if (user.clientType === ClientType.CUSTOMER) {
                if (store.getState().couponsAppState.coupons.length === 0) {
                    if (store.getState().customerAppState.customer === null) {
                        const customerResponse = await jwtAxios.get<CustomerModel>(globalConfigs.urls.customer + user.id + "/get/details");
                        const foundCoupon = customerResponse.data.coupons.find(e => e.id === +this.props.match.params.id);
                        this.setState({ coupon: foundCoupon });
                        store.dispatch(customerDownloadedAction(customerResponse.data));
                        if (!foundCoupon) {
                            const couponsResponse = await jwtAxios.get<CouponModel[]>(globalConfigs.urls.customer + "get/coupon/all");
                            this.setState({ coupon: couponsResponse.data.find(e => e.id === +this.props.match.params.id) });
                            store.dispatch(couponsDownloadedAction(couponsResponse.data));
                        }
                    } else {
                        const couponsResponse = await jwtAxios.get<CouponModel[]>(globalConfigs.urls.customer + "get/coupon/all");
                        this.setState({ coupon: couponsResponse.data.find(e => e.id === +this.props.match.params.id) });
                        store.dispatch(couponsDownloadedAction(couponsResponse.data));
                    }
                } else {
                    // if you are here u have to find the details!
                }
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponDetails">
                <Typography variant="h3" paragraph><i><b>"{this.state.coupon?.title}"</b></i>" Details</Typography>
                <img src={imageNotAvailable} alt="Coupon Details" />
                {/* <img src={this.state.coupon?.image} alt="Coupon Details" /> */}
                <Typography variant="h5" paragraph color="secondary"><b>ID:</b> <i>{this.state.coupon?.id}</i></Typography>
                <Typography variant="h5" paragraph color="secondary"><b>Company ID:</b> <i>{this.state.coupon?.companyId}</i></Typography>
                <Typography variant="h5" paragraph color="secondary"><b>Category:</b> <i>{this.state.coupon?.category}</i></Typography>
                <Typography variant="h5" paragraph color="secondary"><b>Description:</b> <i>{this.state.coupon?.description}</i></Typography>
                <Typography variant="h5" paragraph color="secondary"><b>Start Date:</b> <i>{this.state.coupon?.startDate}</i></Typography>
                <Typography variant="h5" paragraph color="secondary"><b>End Date:</b> <i>{this.state.coupon?.endDate}</i></Typography>
                <Typography variant="h5" paragraph color="secondary">
                    <b>Amount:</b> <i>{this.state.coupon?.amount > 0 ? this.state.coupon?.amount : "Out of Stock"}</i>
                </Typography>
                <Typography variant="h5" paragraph color="secondary"><b>Price:</b> <i>$ {this.state.coupon?.price}</i></Typography>

                <Button onClick={this.props.history.goBack} variant="contained" color="primary" startIcon={<ArrowBack />}>Back</Button>

            </div>
        );
    }
}

export default CouponDetails;
