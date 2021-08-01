import { Button, Typography } from "@material-ui/core";
import { AddBox, ArrowBack, DeleteForever, Edit, RemoveRedEyeOutlined } from "@material-ui/icons";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./CustomersList.css";

interface CustomersListState {
    customers: CustomerModel[];
}

class CustomersList extends Component<{}, CustomersListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { customers: store.getState().customersAppState.customers };
    }

    public async componentDidMount() {
        try {
            if (store.getState().customersAppState.customers.length === 0) {
                const response = await jwtAxios.get<CustomerModel[]>(globalConfigs.urls.admin + "get/customer/all");
                this.setState({ customers: response.data });
                store.dispatch(customersDownloadedAction(response.data));
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CustomersList">

                <table>
                    <caption><Typography variant="h3">Customers List ({this.state.customers.length})</Typography></caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firs Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Coupons</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map(customer =>
                                <tr key={customer.id} className="TableBodyRow">
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.password}</td>
                                    <td>{customer.coupons?.length}</td>
                                    <td>{
                                        <NavLink
                                            to={"/admin/get/customer/" + customer.id}
                                            title="View Customer Details" exact><RemoveRedEyeOutlined />
                                        </NavLink>
                                    }</td>
                                    <td>{
                                        <NavLink
                                            to={{ pathname: "/admin/update/customer", state: customer.id }}
                                            title="Edit Customer" exact><Edit />
                                        </NavLink>
                                    }</td>
                                    <td>{
                                        <NavLink
                                            to={"/admin/delete/customer/" + customer.id}
                                            title="Delete Customer" exact><DeleteForever />
                                        </NavLink>
                                    }</td>
                                </tr>)
                        }
                    </tbody>
                </table>

                <br />
                <NavLink to="/admin/add/customer" exact>
                    <Button variant="contained" color="primary" startIcon={<AddBox />}>Add Customer</Button>
                </NavLink>

                <NavLink to="/home" exact>
                    <Button variant="contained" color="primary" startIcon={<ArrowBack />}>Home</Button>
                </NavLink>

            </div>
        );
    }

}

export default CustomersList;