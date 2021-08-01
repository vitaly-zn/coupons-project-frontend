import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import CompaniesList from "../../CompanyArea/CompaniesList/CompaniesList";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import DeleteCompany from "../../CompanyArea/DeleteCompany/DeleteCompany";
import EditCompany from "../../CompanyArea/EditCompany/EditCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import AllAvailableCoupons from "../../CouponArea/AllAvailableCoupons/AllAvailableCoupons";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import CouponsListForCompany from "../../CouponArea/CouponsListForCompany/CouponsListForCompany";
import CouponsListForCustomer from "../../CouponArea/CouponsListForCustomer/CouponsListForCustomer";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import PurchaseCoupon from "../../CouponArea/PurchaseCoupon/PurchaseCoupon";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CustomersList from "../../CustomerArea/CustomersList/CustomersList";
import DeleteCustomer from "../../CustomerArea/DeleteCustomer/DeleteCustomer";
import EditCustomer from "../../CustomerArea/EditCustomer/EditCustomer";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../../SharedArea/Page404/Page404";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/home" component={Home} exact />

                {/* - Admin - */}
                <Route path="/admin/get/company/all" component={CompaniesList} exact />
                <Route path="/admin/get/customer/all" component={CustomersList} exact />
                <Route path="/admin/add/company" component={AddCompany} exact />
                <Route path="/admin/add/customer" component={AddCustomer} exact />
                <Route path="/admin/update/company" component={EditCompany} exact />
                <Route path="/admin/update/customer" component={EditCustomer} exact />
                <Route path="/admin/delete/company/:id" component={DeleteCompany} exact />
                <Route path="/admin/delete/customer/:id" component={DeleteCustomer} exact />
                <Route path="/admin/get/company/:id" component={CompanyDetails} exact />
                <Route path="/admin/get/customer/:id" component={CustomerDetails} exact />

                {/* - Company - */}
                <Route path="/company/:id/get/coupon/all" component={CouponsListForCompany} exact />
                <Route path="/company/:id/add/coupon" component={AddCoupon} exact />
                <Route path="/company/:id/update/coupon" component={EditCoupon} exact />
                <Route path="/company/delete/coupon/:id" component={DeleteCoupon} exact />
                <Route path="/company/get/coupon/:id" component={CouponDetails} exact />
                <Route path="/company/:id/get/details" component={CompanyDetails} exact />

                {/* - Customer - */}
                <Route path="/customer/get/coupon/all" component={AllAvailableCoupons} exact />
                <Route path="/customer/:id/get/coupon/all" component={CouponsListForCustomer} exact />
                <Route path="/customer/get/coupon/:id" component={CouponDetails} exact />
                <Route path="/customer/:id/purchase" component={PurchaseCoupon} exact />
                <Route path="/customer/:id/get/details" component={CustomerDetails} exact />

                {/* - Login / Logout - */}
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />

                {/* - Guest - */}
                <Route path="/about" component={About} exact />
                <Route path="/contact-us" component={ContactUs} exact />


                <Redirect from="/" to="/home" exact />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
