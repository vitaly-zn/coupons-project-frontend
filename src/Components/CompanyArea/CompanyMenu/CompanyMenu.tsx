import { Typography } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import "./CompanyMenu.css";

interface CompanyMenuState {
    id: number;
}

class CompanyMenu extends Component<{}, CompanyMenuState> {

    public constructor(props: {}) {
        super(props);
        this.state = { id: store.getState().authAppState.user.id };
    }

    public componentDidMount(): void {
        this.setState({ id: store.getState().authAppState.user?.id });
    }

    public render(): JSX.Element {
        return (
            <div className="CompanyMenu">
                <Typography variant="h4">Menu</Typography>

                <nav>
                    <NavLink to="/home" exact>Home</NavLink>
                    <br />
                    <NavLink to={"/company/" + this.state.id + "/get/coupon/all"} exact>My Coupons</NavLink>
                    <br />
                    <NavLink to={"/company/" + this.state.id + "/add/coupon"} exact>Add Coupon</NavLink>
                    <br />
                    <NavLink to={"/company/" + this.state.id + "/get/details"} exact>My Details</NavLink>
                </nav>
            </div>
        );
    }
}

export default CompanyMenu;
