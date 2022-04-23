import * as React from 'react';
import Alert from '@mui/material/Alert';
import {useDispatch} from "react-redux";
import {AlertTitle} from "@mui/material";

import styles from "./ActionAlerts.module.scss";
import {resetError} from "../../../redux/imgSlice";

type ActionAlertsProps = {
    severity: "error" | "warning" | "info" | "success";
    errorDescription: string;
}

export const ActionAlerts: React.FC<ActionAlertsProps> = React.memo(({severity, errorDescription}) => {
    const [isError, setIsError] = React.useState(false);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (errorDescription.length) {
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
                dispatch((resetError("")));
            }, 3333)
        }
    }, [errorDescription, dispatch])
    return (
        <div className={`${styles.wrapper} ${isError && styles.wrapper__visibly}`}>
            <Alert severity={severity}>
                <AlertTitle className={styles.error} style={{textTransform: "capitalize"}}>{severity}</AlertTitle>
                <span>{errorDescription}🥺</span>
            </Alert>
        </div>
    );
})