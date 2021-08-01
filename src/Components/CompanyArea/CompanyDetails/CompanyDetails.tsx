import { Button, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CompanyDetails.css";

interface RouteParams {
    id: string;
}

interface CompanyDetailsState {
    company: CompanyModel;
}

interface CompanyDetailsProps extends RouteComponentProps<RouteParams> {

}

class CompanyDetails extends Component<CompanyDetailsProps, CompanyDetailsState> {

    private currId: number = +this.props.match.params.id;

    public constructor(props: CompanyDetailsProps) {
        super(props);
        this.state = { company: store.getState().companiesAppState.companies.find(c => c.id === this.currId) };
    }

    public async componentDidMount() {
        try {
            if (store.getState().customersAppState.customers.length === 0) {
                const response = await jwtAxios.get<CompanyModel>(globalConfigs.urls.admin + "get/company?id=" + this.currId);
                this.setState({ company: response.data });
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CompanyDetails">
                <Typography variant="h3" paragraph><i><b>"{this.state.company?.name}"</b></i> Details</Typography>

                <Typography variant="h5" paragraph><b>ID:</b> <i>{this.state.company?.id}</i></Typography>
                <Typography variant="h5" paragraph><b>Name:</b> <i>{this.state.company?.name}</i></Typography>
                <Typography variant="h5" paragraph><b>Email:</b> <i>{this.state.company?.email}</i></Typography>
                <Typography variant="h5" paragraph><b>Password:</b> <i>{this.state.company?.password}</i></Typography>

                <Typography variant="h4">Available Coupons ({this.state.company?.coupons.length}):</Typography>
                <div>
                    {
                        this.state.company?.coupons.length === 0 &&
                        <Typography variant="body1" paragraph><br />
                            <em> --- Coupons not posted yet --- </em>
                        </Typography>
                    }
                    {
                        this.state.company?.coupons.map(e => <CouponCard coupon={e} key={e.id} />)
                    }
                </div>

                <Button
                    onClick={this.props.history.goBack}
                    variant="contained" color="primary" startIcon={<ArrowBack />}>
                    Back
                </Button>

            </div>
        );
    }
}

export default CompanyDetails;
