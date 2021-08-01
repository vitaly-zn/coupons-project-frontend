import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customerAddedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();
    const history = useHistory();

    async function onSubmit(customer: CustomerModel) {
        try {
            const response = await jwtAxios.post<CustomerModel>(globalConfigs.urls.admin + "add/customer", customer);
            const addedCustomer = response.data;
            store.dispatch(customerAddedAction(addedCustomer));
            history.push("/admin/get/customer/all");
            notify.success("Customer [" + addedCustomer.id + ":" + addedCustomer.firstName + "-" + addedCustomer.lastName + "] added");
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCustomer">
            <Typography variant="h4">Add Customer</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("firstName", {
                        required: { value: true, message: "Missing first name" },
                        minLength: { value: 2, message: "First name must be at least 2 characters" },
                        maxLength: { value: 30, message: "First name must be at most 30 characters" }
                    })}
                        label="First Name"
                        type="text"
                        placeholder="Enter first name"
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
                        placeholder="Enter last name"
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
                        placeholder="Enter email"
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
                        placeholder="Enter password"
                        required
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Add</Button>
                    <NavLink to="/admin/get/customer/all" exact>
                        <Button color="secondary" variant="contained">Cancel</Button>
                    </NavLink>
                </div>

            </form>

        </div>
    );
}

export default AddCustomer;
