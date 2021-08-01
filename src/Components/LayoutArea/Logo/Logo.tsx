import couponLogo from "../../../Assets/Images/Logos/coupon_logo.png";
import "./Logo.css";

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={couponLogo} alt="Main Coupon Logo" />
        </div>
    );
}

export default Logo;
