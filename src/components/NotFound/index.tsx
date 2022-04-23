import React from "react";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";

import styles from "./NotFound.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import {OrangeButton} from "../UiComponents/OrangeButton";

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    function toMain() {
        navigate("/");
    }

    return (
        <div className={styles.wrapper}>
            <Alert className={styles.alert} severity="warning">Page not found.</Alert>
            <OrangeButton text={"Return to homepage"} icon={<HomeIcon/>} onClick={toMain}/>
        </div>
    );
};