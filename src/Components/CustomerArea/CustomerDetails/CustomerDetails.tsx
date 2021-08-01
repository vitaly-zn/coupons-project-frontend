import { Button, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CustomerDetails.css";

interface RouteParams {
    id: string;
}

interface CustomerDetailsProps extends RouteComponentProps<RouteParams> {

}

interface CustomerDetailsState {
    customer: CustomerModel;
}

class CustomerDetails extends Component<CustomerDetailsProps, CustomerDetailsState> {

    private currId: number = +this.props.match.params.id;

    public constructor(props: CustomerDetailsProps) {
        super(props);
        this.state = { customer: store.getState().customersAppState.customers.find(c => c.id === this.currId) };
    }

    public async componentDidMount() {
        try {
            if (store.getState().customersAppState.customers.length === 0) {
                const response = await jwtAxios.get<CustomerModel>(globalConfigs.urls.admin + "get/customer?id=" + this.currId);
                this.setState({ customer: response.data });
            }
        } catch (err) {
            notify.error(err);
        }
    }


    public render(): JSX.Element {
        return (
            <div className="CustomerDetails">
                <Typography variant="h3"><i><b>"{this.state.customer?.firstName + " " + this.state.customer?.lastName}"</b></i> Details</Typography>

                <Typography variant="h5" paragraph><b>ID:</b> <i>{this.state.customer?.id}</i></Typography>
                <Typography variant="h5" paragraph><b>First Name:</b> <i>{this.state.customer?.firstName}</i></Typography>
                <Typography variant="h5" paragraph><b>Last Name:</b> <i>{this.state.customer?.lastName}</i></Typography>
                <Typography variant="h5" paragraph><b>Email:</b> <i>{this.state.customer?.email}</i></Typography>
                <Typography variant="h5" paragraph><b>Password:</b> <i>{this.state.customer?.password}</i></Typography>

                <Typography variant="h4">Available Coupons ({this.state.customer?.coupons.length}):</Typography>
                <div>
                    {
                        this.state.customer?.coupons.length === 0 &&
                        <Typography variant="body1" paragraph><br /><em> --- Coupons not purchased yet --- </em></Typography>
                    }
                    {
                        this.state.customer?.coupons.map(e => <CouponCard coupon={e} key={e.id} />)
                    }
                </div>

                <Button onClick={this.props.history.goBack} variant="contained" color="primary" startIcon={<ArrowBack />}>Back</Button>

            </div>
        );
    }
}

export default CustomerDetails;
