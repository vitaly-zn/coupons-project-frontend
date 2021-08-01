import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./About.css";

function About(): JSX.Element {
    return (
        <div className="About">
            <br />
            <Typography variant="h4" paragraph>
                This is coupon web site provides options to sell and purchase coupons...
            </Typography>
            <br />
            <Typography paragraph>
                Please follow the link
                <NavLink to="/contact-us" exact>Contact Us</NavLink>
                for more information.
            </Typography>
        </div>
    );
}

export default About;
