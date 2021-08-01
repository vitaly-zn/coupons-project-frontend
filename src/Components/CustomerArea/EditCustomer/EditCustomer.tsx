import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customerUpdatedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./EditCustomer.css";

function EditCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();
    const history = useHistory();
    const location = useLocation();
    const selectedCustomer = store.getState().customersAppState.customers.find(c => c.id === location.state);

    async function onSubmit(customer: CustomerModel) {
        try {
            customer.id = selectedCustomer.id;
            const response = await jwtAxios.put<CustomerModel>(globalConfigs.urls.admin + "update/customer", customer);
            const updatedCustomer = response.data;
            store.dispatch(customerUpdatedAction(updatedCustomer));
            notify.success("Customer " + selectedCustomer.firstName + " " + selectedCustomer.lastName + " was updated!");
            history.push("/admin/get/customer/all");
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="EditCustomer">
            <Typography variant="h4">Edit: "{selectedCustomer.firstName + " " + selectedCustomer.lastName}"</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("firstName", {
                        required: { value: true, message: "Missing first name" },
                        minLength: { value: 2, message: "First name must be at least 2 characters" },
                        maxLength: { value: 30, message: "First name must be at most 30 characters" }
                    })}
                        label="First Name"
                        type="text"
                        placeholder={selectedCustomer.firstName}
                        required
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </FormControl>

                <FormControl>
                    <TextField {...register("lastName", {
                        required: { value: true, message: "Missing last name" },
                        minLength: { value: 2, message: "Last name must be at least 2 characters" },
                        maxLength: { value: 30, message: "Last name must be at most 30 characters" }
                    })}
                        label="Last Name"
                        type="text"
                        placeholder={selectedCustomer.lastName}
                        required
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                </FormControl>

                <FormControl>
                    <TextField {...register("email", {
                        required: { value: true, message: "Missing email" }
                    })}
                        label="Email"
                        type="email"
                        placeholder={selectedCustomer.email}
                        required
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </FormControl>

                <FormControl>
                    <TextField {...register("password", {
                        required: { value: true, message: "Password missing" },
                        minLength: { value: 4, message: "Password must be at least 4 characters" },
                        maxLength: { value: 30, message: "Password must at most 30 characters" }
                    })}
                        label="Password"
                        type="password"
                        placeholder={selectedCustomer.password}
                        required
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Update</Button>
                    <NavLink to="/admin/get/customer/all" exact>
                        <Button color="secondary" variant="contained">Cancel</Button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default EditCustomer;
