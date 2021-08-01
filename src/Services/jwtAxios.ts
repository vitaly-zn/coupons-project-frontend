import axios from "axios";
import UserModel from "../Models/UserModel";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
    request.headers = {
        "authorization": "Bearer " + (JSON.parse(localStorage.getItem("coupon-system-user")) as UserModel).token
    };
    return request;
});

export default jwtAxios;