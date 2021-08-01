import UserModel from "../Models/UserModel";

// App State
export class AuthAppState {
    public user: UserModel = null;
    public constructor() {
        const storedUser: UserModel = JSON.parse(localStorage.getItem("coupon-system-user"));
        if (storedUser) {
            this.user = storedUser;
        }
    }
}

// Action Types
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

// Action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// Action Creators
export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload: user };
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

// Reducers
export function authReducer(currentState: AuthAppState = new AuthAppState(), action: AuthAction): AuthAppState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Login:
            newState.user = action.payload;
            localStorage.setItem("coupon-system-user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("coupon-system-user");
            break;
    }

    return newState;
}