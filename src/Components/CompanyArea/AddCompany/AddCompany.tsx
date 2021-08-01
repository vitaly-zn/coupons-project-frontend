import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyAddedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();
    const history = useHistory();

    async function onSubmit(company: CompanyModel) {
        try {
            const response = await jwtAxios.post<CompanyModel>(globalConfigs.urls.admin + "add/company", company);
            const addedCompany = response.data;
            store.dispatch(companyAddedAction(addedCompany));
            history.push("/admin/get/company/all");
            notify.success("Company [" + addedCompany.id + ":" + addedCompany.name + "] added");
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCompany">
            <Typography variant="h4">Add Company</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("name", {
                        required: { value: true, message: "Missing name" },
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                        maxLength: { value: 30, message: "Name must be at most 30 characters" }
                    })}
                        label="Name"
                        type="text"
                        placeholder="Enter name"
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                    <NavLink to="/admin/get/company/all" exact>
                        <Button color="secondary" variant="contained">Cancel</Button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default AddCompany;
