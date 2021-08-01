import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyDeletedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";

interface RouteParams {
    id: string;
}

interface DeleteCompanyProps extends RouteComponentProps<RouteParams> {

}

class DeleteCompany extends Component<DeleteCompanyProps> {

    public constructor(props: DeleteCompanyProps) {
        super(props);
    }

    public async componentDidMount() {
        try {
            const id: number = +this.props.match.params.id;
            const response = await jwtAxios.delete<CompanyModel>(globalConfigs.urls.admin + "delete/company?id=" + id);
            const deletedCompany = response.data;
            store.dispatch(companyDeletedAction(id));

            const customers = store.getState().customersAppState.customers;
            if (customers.length > 0) {
                for (let i = 0; i < customers.length; i++) {
                    const currCoupons = customers[i].coupons;
                    for (let j = 0; j < currCoupons.length; j++) {
                        for (let k = 0; k < deletedCompany.coupons.length; k++) {
                            if (currCoupons[j].id === deletedCompany.coupons[k].id) {
                                customers[i].coupons.splice(j, 1);
                            }
                        }
                    }
                }
            }

            notify.success("Company " + deletedCompany.name + " deleted.");
            this.props.history.push("/admin/get/company/all");
        } catch (err) {
            notify.error(err);
            this.props.history.goBack();
        }
    }

    public render(): JSX.Element {
        return null;
    }

}

export default DeleteCompany;
