import React from "react";
import {useDispatch} from "react-redux";

import styles from "../ItemsCard.module.scss";
import {CardCity} from "../CardCity";
import {
    useFavIdSelector, useFavSelector,
    useLoadingFavSelector,
} from "../../../redux/selectors";
import {CardCityPreloader} from "../CardCity/CardCityPreloader";
import Alert from "@mui/material/Alert";
import {CityStateModel} from "../../../models/redux/findCity";
import {fetchFavCity} from "../../../redux/favCitySlice";

export const ItemsFavorite: React.FC = React.memo(() => {
    const fav = useFavSelector();
    const favById = useFavIdSelector();
    const loadingFav = useLoadingFavSelector();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (favById.length && !fav.length) {
            dispatch(fetchFavCity(favById.join()));
        }
    }, [favById, fav, dispatch]);

    return (
        <div className={styles.wrapper}>
            {(fav && (loadingFav === 0 || loadingFav === 2)) && fav.map((obj: CityStateModel) => {
                return <CardCity key={obj.id} city={obj}/>
            })}
            {(fav && loadingFav === 1) && Array.from(favById).map((_, i) => {
                return <CardCityPreloader key={i}/>
            })}
            {(fav && loadingFav === 3) && <Alert severity="error">Something went wrong 😏</Alert>}
            {!favById.length &&
                <Alert severity="info">Here you can add a card with the current weather of your city 😉</Alert>}
        </div>
    );
})