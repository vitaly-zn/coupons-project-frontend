import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./MainMenu.css";

function MainMenu(): JSX.Element {
    return (
        <div className="MainMenu">
            <Typography variant="h4">Menu</Typography>

            <nav>
                <NavLink to="/home" exact>Home</NavLink>
                <br />
                <NavLink to="/about" exact>About</NavLink>
                <br />
                <NavLink to="/contact-us" exact>Contact Us</NavLink>
            </nav>
        </div>
    );
}

export default MainMenu;
