import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">

            <Typography variant="h4">Menu</Typography>

            <nav>
                <NavLink to="/home" exact>Home</NavLink>
                <br />
                <NavLink to="/admin/get/company/all" exact>Companies</NavLink>
                <NavLink to="/admin/get/customer/all" exact>Customers</NavLink>
                <br />
                <NavLink to="/admin/add/company" exact>Add Company</NavLink>
                <NavLink to="/admin/add/customer" exact>Add Customer</NavLink>
            </nav>
        </div>
    );
}

export default AdminMenu;
