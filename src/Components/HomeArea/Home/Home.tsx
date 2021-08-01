import { Typography } from "@material-ui/core";
import store from "../../../Redux/Store";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            {
                store.getState().authAppState.user === null &&
                <Typography paragraph variant="h3">Greetings <b><i>Guest</i></b></Typography>
            }
            {
                store.getState().authAppState.user?.clientType &&
                <Typography paragraph variant="h3">
                    Greetings <b><i>{store.getState().authAppState.user.name}</i></b>
                </Typography>
            }

            <br />
            <Typography variant="h3" paragraph>Welcome to Coupons System Website!</Typography>
            <br />
            <Typography variant="h3" paragraph>The Best Web Site to Buy/Sell coupons!</Typography>
        </div>
    );
}

export default Home;
