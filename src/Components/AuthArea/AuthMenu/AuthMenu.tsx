import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    currentUser: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { currentUser: store.getState().authAppState.user };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ currentUser: store.getState().authAppState.user });
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                {
                    // Greet Guest
                    this.state.currentUser === null &&
                    <>
                        Hello <span>Guest</span>|<NavLink to="/login">Login</NavLink>
                    </>
                }
                {
                    // Greet Admin / Company / Customer
                    this.state.currentUser?.clientType &&
                    <>
                        Hello <span>{this.state.currentUser.name}</span>|
                        <NavLink to="/logout">Logout</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default AuthMenu;
