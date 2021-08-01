import { Button, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import PageNotFoundImage from "../../../Assets/Images/Status/page_404.png";
import "./Page404.css";

function Page404(): JSX.Element {
    const history = useHistory();

    return (
        <div className="Page404">
            <Typography variant="h1">Page 404</Typography>
            <img src={PageNotFoundImage} alt="Page 404 - Page Not found!" />
            <p>The page you are trying to surf doesn't exists!</p>

            <Button onClick={history.goBack} variant="contained" color="primary" startIcon={<ArrowBack />}>Back</Button>
        </div>
    );
}

export default Page404;
