import { Typography } from "@material-ui/core";
import { Email, Facebook, Instagram, Phone, Print, Twitter } from "@material-ui/icons";
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs">
            <br />
            <Typography variant="h4" paragraph>
                Here how you can contact us:
            </Typography>
            <Typography paragraph><Email /> <b>Mail:</b> <i>coupons@mail.com</i></Typography>
            <Typography paragraph><Phone /> <b>Phone:</b> <i>+123-1234567890</i></Typography>
            <Typography paragraph><Print /> <b>Fax:</b> <i>+123-1234567891</i></Typography>
            <Typography paragraph><Facebook /> <b>Facebook:</b> <i>facebook</i> </Typography>
            <Typography paragraph><Twitter /> <b>Twitter:</b> <i>twitter</i> </Typography>
            <Typography paragraph><Instagram /> <b>Instagram:</b> <i>instagram</i> </Typography>
        </div>
    );
}

export default ContactUs;
