import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import { DeleteForever, Edit, RemoveRedEyeOutlined, Shop } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import imageNotAvailable from "../../../Assets/Images/Status/no_image_available.png";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import "./CouponCard.css";

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CouponCard">
            <Card>
                <CardHeader
                    title={props.coupon.title}
                    subheader={new Date().toLocaleDateString()}
                />
                <CardMedia
                    component="img"
                    // image={props.coupon.image}
                    image={imageNotAvailable}
                    title={props.coupon.title}
                    alt={props.coupon.image}
                />
                <CardContent>
                    <Typography paragraph color="secondary"><b>Start Date:</b> <i>{props.coupon.startDate}</i></Typography>
                    <Typography paragraph color="secondary"><b>End Date:</b> <i>{props.coupon.endDate}</i></Typography>
                    <Typography paragraph color="secondary">
                        <b>Amount:</b> <i>{props.coupon.amount > 0 ? props.coupon.amount : "Out of Stock"}</i>
                    </Typography>
                    <Typography paragraph color="secondary"><b>Price:</b> <i>$ {props.coupon.price}</i></Typography>
                </CardContent>

                {
                    // show it only to company clients
                    store.getState().authAppState.user.clientType === ClientType.COMPANY &&
                    <>
                        <CardActions>
                            <NavLink
                                to={{
                                    pathname: "/company/" + store.getState().authAppState.user.id + "/update/coupon",
                                    state: props.coupon.id
                                }}
                                title="Edit Coupon" exact><Edit style={{ fontSize: 40 }}
                                />
                            </NavLink>
                            <NavLink
                                to={"/company/get/coupon/" + props.coupon.id}
                                title="View Coupon" exact><RemoveRedEyeOutlined style={{ fontSize: 40 }}
                                />
                            </NavLink>
                            <NavLink
                                to={"/company/delete/coupon/" + props.coupon.id}
                                title="Delete Coupon" exact><DeleteForever style={{ fontSize: 40 }}
                                />
                            </NavLink>
                        </CardActions>
                    </>
                }

                {
                    // show it only to customer clients
                    store.getState().authAppState.user.clientType === ClientType.CUSTOMER &&
                    <>
                        <CardActions>
                            <NavLink
                                to={"/customer/get/coupon/" + props.coupon.id}
                                title="View Coupon" exact><RemoveRedEyeOutlined style={{ fontSize: 40 }}
                                />
                            </NavLink>
                            <NavLink
                                to={{ pathname: "/customer/" + store.getState().authAppState.user.id + "/purchase", state: props.coupon.id }}
                                title="Purchase Coupon" exact><Shop style={{ fontSize: 40 }}
                                />
                            </NavLink>
                        </CardActions>
                    </>
                }
            </Card>
        </div>
    );
}

export default CouponCard;
