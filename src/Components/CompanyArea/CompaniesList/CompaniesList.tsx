import { Button, Typography } from "@material-ui/core";
import { AddBox, ArrowBack, DeleteForever, Edit, RemoveRedEyeOutlined } from "@material-ui/icons";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./CompaniesList.css";

interface CompaniesListState {
    companies: CompanyModel[];
}

class CompaniesList extends Component<{}, CompaniesListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { companies: store.getState().companiesAppState.companies };
    }

    public async componentDidMount() {
        try {
            if (store.getState().companiesAppState.companies.length === 0) {
                const response = await jwtAxios.get<CompanyModel[]>(globalConfigs.urls.admin + "get/company/all");
                this.setState({ companies: response.data });
                store.dispatch(companiesDownloadedAction(response.data));
            }
        } catch (err) {
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CompaniesList">

                <table>
                    <caption>
                        <Typography variant="h3">Companies List ({this.state.companies.length})</Typography>
                    </caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
                            this.state.companies.map(company =>
                                <tr key={company.id} className="TableBodyRow">
                                    <td>{company.id}</td>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td>
                                    <td>{company.password}</td>
                                    <td>{company.coupons?.length}</td>
                                    <td>{
                                        <NavLink
                                            to={"/admin/get/company/" + company.id}
                                            title="View Company Details" exact><RemoveRedEyeOutlined />
                                        </NavLink>
                                    }</td>
                                    <td>{
                                        <NavLink
                                            to={{ pathname: "/admin/update/company", state: company.id }}
                                            title="Edit Company" exact><Edit />
                                        </NavLink>
                                    }</td>
                                    <td>{
                                        <NavLink
                                            to={"/admin/delete/company/" + company.id}
                                            title="Delete Company" exact><DeleteForever />
                                        </NavLink>
                                    }</td>
                                </tr>)
                        }
                    </tbody>
                </table>


                <br />
                <NavLink to="/admin/add/company" exact>
                    <Button variant="contained" color="primary" startIcon={<AddBox />}>Add Company</Button>
                </NavLink>

                <NavLink to="/home" exact>
                    <Button variant="contained" color="primary" startIcon={<ArrowBack />}>Home</Button>
                </NavLink>

            </div>
        );
    }
}

export default CompaniesList;