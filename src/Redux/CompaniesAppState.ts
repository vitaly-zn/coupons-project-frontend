import CompanyModel from "../Models/CompanyModel";

// AppState
export class CompaniesAppState {
    public companies: CompanyModel[] = [];
}

// Action Types
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted"
}

// Action
export interface CompanyAction {
    type: CompaniesActionType;
    payload: any;
}

// Action Creators
export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}
export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}
export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}
export function companyDeletedAction(id: number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

// Reducer
export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(), action: CompanyAction): CompaniesAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated:
            const updatedCompany: CompanyModel = action.payload;
            const index = newState.companies.findIndex(company => company.id === updatedCompany.id);
            newState.companies[index] = { ...updatedCompany };
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies.splice(newState.companies.findIndex(company => company.id === action.payload), 1);
            break;
    }

    return newState;
}