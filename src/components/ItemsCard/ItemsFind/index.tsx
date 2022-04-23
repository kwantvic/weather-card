import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import {Alert, CircularProgress} from "@mui/material";

import styles from "../ItemsCard.module.scss";
import {CardCity} from "../CardCity";
import {changeNameCity, changeSearchValue, fetchGetCity} from "../../../redux/findCitySlice";
import {useFindCitySelector, useLoadingFindSelector, useNameCitySelector} from "../../../redux/selectors";
import {OrangeButton} from "../../UiComponents/OrangeButton";
import {CityStateModel} from "../../../models/redux/findCity";

export const ItemsFind: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {location} = useParams();
    const city = useFindCitySelector();
    const nameCity = useNameCitySelector();
    const loadingFind = useLoadingFindSelector();

    React.useEffect(() => {
        if (location) {
            dispatch(changeSearchValue(location));
            dispatch(changeNameCity(location));
        }
    }, [location, dispatch]);

    React.useEffect(() => {
        if (location) {
            if (location !== nameCity) {
                dispatch(fetchGetCity(location));
            }
        }
    }, [location, nameCity, dispatch])

    function toMain() {
        navigate("/");
    }

    return (
        <div data-testid="find" className={styles.wrapper}>
            {loadingFind === 1 && <CircularProgress className={styles.progress} color="secondary"/>}
            {city.length
                ? (loadingFind === 2 || loadingFind === 0) && city.map((obj: CityStateModel) => {
                return <CardCity key={obj.id} city={obj}/>
            })
                : (loadingFind === 2 || loadingFind === 3) &&
                <Alert className={styles.alert} severity="error">Location not found</Alert>
            }
            <div className={styles.btnMain}><OrangeButton text={"Return to homepage"} icon={<HomeIcon/>}
                                                          onClick={toMain}/></div>
        </div>
    );
})