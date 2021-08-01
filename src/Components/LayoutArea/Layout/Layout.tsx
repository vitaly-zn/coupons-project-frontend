import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Unsubscribe } from "redux";
import { ClientType } from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AdminMenu from "../../AdminArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../CompanyArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../CustomerArea/CustomerMenu/CustomerMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import MainMenu from "../MainMenu/MainMenu";
import Routing from "../Routing/Routing";
import "./Layout.css";

interface LayoutState {
    currentUser: UserModel;
}

class Layout extends Component<{}, LayoutState> {

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
        return <div className="Layout">

            <BrowserRouter>
                <header>
                    <Logo />
                    <Header />
                </header>

                <aside>

                    {
                        // Main Menu
                        this.state.currentUser === null &&
                        <MainMenu />
                    }
                    {
                        // Admin Menu
                        this.state.currentUser?.clientType === ClientType.ADMINISTRATOR &&
                        <AdminMenu />
                    }
                    {
                        // Company Menu
                        this.state.currentUser?.clientType === ClientType.COMPANY &&
                        <CompanyMenu />
                    }
                    {
                        // Customer Menu
                        this.state.currentUser?.clientType === ClientType.CUSTOMER &&
                        <CustomerMenu />
                    }
                </aside>

                <main>
                    <Routing />
                </main>

                <footer>
                    <Footer />
                </footer>

            </BrowserRouter>
        </div>
    }
}

export default Layout;
