import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CredentialsModel, { ClientType } from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { loginAction } from "../../../Redux/AuthAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import notify from "../../../Services/Notifications";
import "./Login.css";

function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const [clientType, setType] = useState<ClientType>("" as unknown as ClientType);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as ClientType);
    };

    async function onSubmit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globalConfigs.urls.login, credentials);
            store.dispatch(loginAction(response.data));
            notify.success("You are logged in now!");
            history.push("/home");
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <Typography variant="h3">Login</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormControl>
                    <TextField {...register("email", {
                        required: { value: true, message: "Missing email" },
                        minLength: { value: 5, message: "Email is too short" }
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
                        required: { value: true, message: "Missing password" },
                        minLength: { value: 4, message: "Password must be al least 4 characters" },
                        maxLength: { value: 20, message: "Password must be at most 20 characters" }
                    })}
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        required
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </FormControl>

                <br />

                <FormControl>
                    <InputLabel required>Client Type</InputLabel>
                    <Select {...register("clientType", { required: true })}
                        value={clientType}
                        error={!!errors.clientType}
                        onChange={handleChange}
                    >
                        <MenuItem value={ClientType.ADMINISTRATOR}>Administrator</MenuItem>
                        <MenuItem value={ClientType.COMPANY}>Company</MenuItem>
                        <MenuItem value={ClientType.CUSTOMER}>Customer</MenuItem>
                    </Select>
                    <FormHelperText>Select Client Type</FormHelperText>
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Login</Button>
                    <NavLink to="/home" exact>
                        <Button color="secondary" variant="contained">Cancel</Button>
                    </NavLink>
                </div>

            </form>
        </div>
    );
}

export default Login;
