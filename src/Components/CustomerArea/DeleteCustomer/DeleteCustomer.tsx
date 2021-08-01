import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customerDeletedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";

interface RouteParams {
    id: string;
}

interface DeleteCustomerProps extends RouteComponentProps<RouteParams> {

}

class DeleteCustomer extends Component<DeleteCustomerProps> {

    public constructor(props: DeleteCustomerProps) {
        super(props);
    }

    async componentDidMount() {
        try {
            const id: number = +this.props.match.params.id;
            const response = await jwtAxios.delete<CustomerModel>(globalConfigs.urls.admin + "delete/customer?id=" + id);
            const deletedCustomer = response.data;
            store.dispatch(customerDeletedAction(id));
            notify.success("Customer " + deletedCustomer.firstName + " " + deletedCustomer.lastName + " deleted.")
            this.props.history.push("/admin/get/customer/all");
        } catch (err) {
            notify.error(err);
            this.props.history.goBack();
        }
    }

    public render(): JSX.Element {
        return null;
    }
}

export default DeleteCustomer;
