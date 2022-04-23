import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import {Alert, CircularProgress} from "@mui/material";

import styles from './ItemsFind.module.scss';
import {CardCity} from "../../uiComponents/CardCity";
import {CityState, fetchGetCity, resetFind} from "../../../redux/getCitySlice";
import {useFindCitySelector, useLoadingFindSelector} from "../../../redux/selectors";
import {YellowButton} from "../../uiComponents/OrangeButton";
import {addFav} from "../../../redux/favCitySlice";

export const FindLocation: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {location} = useParams();
    const city = useFindCitySelector();
    const loadingFind = useLoadingFindSelector();

    React.useEffect(() => {
        if (localStorage.getItem("arrFavCity")) {
            let arr: number[] = JSON.parse(localStorage.getItem("arrFavCity")!);
            (arr.length > 0) && dispatch(addFav(arr));
        } else {
            let arr: number[] = [];
            localStorage.setItem("arrFavCity", JSON.stringify(arr));
        }
    }, [dispatch])

    React.useEffect(() => {
        location && dispatch(fetchGetCity(location))
    }, [location, dispatch]);

    function toMain() {
        dispatch(resetFind());
        navigate("/");
    }

    return (
        <div className={styles.wrapper}>
            {loadingFind === 1 && <CircularProgress className={styles.progress} color="secondary"/>}
            {city.length
                ? (loadingFind === 2) && city.map((obj: CityState) => {
                        return <CardCity key={obj.id} city={obj}/>
                    })
                : (loadingFind === 2 || loadingFind === 3) && <Alert className={styles.alert} severity="error">Location not found</Alert>
            }
            <YellowButton text={"Return to homepage"} icon={<HomeIcon/>} onClick={toMain}/>
        </div>
    );
}