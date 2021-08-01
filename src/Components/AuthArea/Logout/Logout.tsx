import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";

function Logout(): JSX.Element {
    const history = useHistory();

    useEffect(() => {
        store.dispatch(logoutAction());
        store.getState().companyAppState.company = null;
        store.getState().customerAppState.customer = null;
        store.getState().companiesAppState.companies = [];
        store.getState().customersAppState.customers = [];
        store.getState().couponsAppState.coupons = [];
        store.getState().authAppState.user = null;
        notify.success("You are now logged out.");
        history.push("/home");
    });

    return <></>;
}

export default Logout;
