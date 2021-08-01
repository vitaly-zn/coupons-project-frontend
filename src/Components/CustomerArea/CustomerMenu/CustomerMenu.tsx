import { Typography } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import "./CustomerMenu.css";

interface CustomerMenuState {
    id: number;
}

class CustomerMenu extends Component<{}, CustomerMenuState> {

    public constructor(props: {}) {
        super(props);
        this.state = { id: store.getState().authAppState.user?.id };
    }

    public componentDidMount(): void {
        this.setState({ id: store.getState().authAppState.user?.id });
    }

    public render(): JSX.Element {
        return (
            <div className="CustomerMenu">
                <Typography variant="h4">Menu</Typography>

                <nav>
                    <NavLink to="/home" exact>Home</NavLink>
                    <br />
                    <NavLink to={"/customer/" + this.state.id + "/get/coupon/all"} exact>My Coupons</NavLink>
                    <br />
                    <NavLink to="/customer/get/coupon/all" exact>Coupons Shop</NavLink>
                    <br />
                    <NavLink to={"/customer/" + this.state.id + "/get/details"} exact>My Details</NavLink>
                </nav>
            </div>
        );
    }
}

export default CustomerMenu;
