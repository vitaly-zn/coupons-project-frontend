import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { companyReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponsAppState";
import { customerReducer } from "./CustomerAppState";
import { customersReducer } from "./CustomersAppState";

const reducers = combineReducers({
    companiesAppState: companiesReducer,
    customersAppState: customersReducer,
    authAppState: authReducer,
    couponsAppState: couponsReducer,
    companyAppState: companyReducer,
    customerAppState: customerReducer
});
const store = createStore(reducers);

export default store;