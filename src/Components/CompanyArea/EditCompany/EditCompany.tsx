import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./EditCompany.css";

function EditCompany(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();
    const history = useHistory();
    const location = useLocation();
    const selectedCompany: CompanyModel = store.getState().companiesAppState.companies.find(c => c.id === location.state);

    async function onSubmit(company: CompanyModel) {
        try {
            company.id = selectedCompany.id;
            const response = await jwtAxios.put<CompanyModel>(globalConfigs.urls.admin + "update/company", company);
            const updatedCompany = response.data;
            store.dispatch(companyUpdatedAction(updatedCompany));
            notify.success("Company " + selectedCompany.name + " was updated!");
            history.push("/admin/get/company/all");
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="EditCompany">
            <Typography variant="h4">Edit: "{selectedCompany.name}"</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("email", {
                        required: { value: true, message: "Missing email" }
                    })}
                        label="Email"
                        type="email"
                        placeholder={selectedCompany.email}
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
                        placeholder={selectedCompany.password}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Update</Button>
                    <NavLink to="/admin/get/company/all" exact>
                        <Button color="secondary" variant="contained">Cancel</Button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
}

export default EditCompany;
