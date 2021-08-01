import CustomerModel from "../Models/CustomerModel";

// AppState
export class CustomersAppState {
    public customers: CustomerModel[] = [];
}

// Action Types
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted"
}

// Action
export interface CustomerAction {
    type: CustomersActionType;
    payload: any;
}

// Action Creators
export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}
export function customerAddedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}
export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}
export function customerDeletedAction(id: number): CustomerAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

// Reducer
export function customersReducer(currentState: CustomersAppState = new CustomersAppState(), action: CustomerAction): CustomersAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated:
            const updatedCustomer: CustomerModel = action.payload;
            const index = newState.customers.findIndex(customer => customer.id === updatedCustomer.id);
            newState.customers[index] = { ...updatedCustomer };
            break;
        case CustomersActionType.CustomerDeleted:
            newState.customers.splice(newState.customers.findIndex(customer => customer.id === action.payload, 1));
            break;
    }

    return newState;
}