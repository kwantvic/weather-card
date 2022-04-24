import React from "react";
import {Card, CardActionArea, CardContent, CircularProgress, Typography} from "@mui/material";
import {countryCodeEmoji} from "country-code-emoji";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useDispatch} from "react-redux";

import styles from "./CardCity.module.scss";
import {ToolTip} from "../../UiComponents/ToolTip"
import {useLocation, useNavigate} from "react-router-dom";
import {useFavIdSelector, useLoadingUpdateSelector, useUpdateCityIdSelector} from "../../../redux/selectors";
import {addFavCity, addFavId, changeUpdateCityId, delFavId, fetchUpdateCity} from "../../../redux/favCitySlice";
import {getLocalFav, setLocalFav} from "../../../utils/functional";
import DraggableDialog from "../../UiComponents/DraggableDialog";
import {CityStateModel} from "../../../models/redux/findCity";

interface CardCityProps {
    city: CityStateModel
}

export const CardCity: React.FC<CardCityProps> = React.memo(({city}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFindPath = useLocation().pathname.includes("/find/");
    const favById = useFavIdSelector();
    const updateCityId = useUpdateCityIdSelector();

    function clickCard() {
        navigate(`/detailed/${city.id}`);
    }

    function onDelFav() {
        dispatch(delFavId(city.id));
        if (getLocalFav()) {
            let arr: number[] = JSON.parse(getLocalFav()!);
            (arr.length > 0) && setLocalFav(arr.filter(x => x !== city.id));
        } else {
            setLocalFav([]);
        }
    }

    function onAddFav(e: React.MouseEvent) {
        e.stopPropagation();
        dispatch(addFavId(city.id));
        dispatch(addFavCity(city));
        if (getLocalFav()) {
            let arr: number[] = JSON.parse(getLocalFav()!);
            arr.push(city.id);
            setLocalFav(arr);
        } else {
            setLocalFav([city.id]);
        }
    }

    function updateCity(e: React.MouseEvent) {
        e.stopPropagation();
        dispatch(changeUpdateCityId(city.id));
        dispatch(fetchUpdateCity(city.id));
    }

    return (
        <div data-testid="city-card" className={styles.wrapper}>
            {(useLoadingUpdateSelector() === 1 && updateCityId === city.id) &&
                <div className={styles.wrapperProgress}>
                    <CircularProgress className={styles.progress}/>
                </div>}
            <Card data-testid="card"
                  className={(useLoadingUpdateSelector() === 1 && updateCityId === city.id) ? `${styles.wrapperCard} ${styles.load}` : `${styles.wrapperCard}`}
                  onClick={clickCard}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {city.name} {city.country && countryCodeEmoji(city.country)}
                        </Typography>
                        <Typography variant="h1" color="secondary">
                            {city.temp ? Math.round(city.temp) : `--`}°<img className={styles.img} alt="icon"
                                                                            src={`https://openweathermap.org/img/w/${city.weathIcon}.png`}/>
                        </Typography>
                        <Typography color="text.disabled" gutterBottom variant="h6" component="div">
                            {city.weathDescr}
                        </Typography>
                        <div className={styles.icons}>
                            {!favById.includes(city.id) &&
                                <div data-testid="icon-addFav" onClick={onAddFav} className={styles.icon}>
                                    <ToolTip text={"Bookmark it"} icon={<FavoriteBorderIcon/>}/>
                                </div>
                            }
                            {favById.includes(city.id) &&
                                <DraggableDialog title={"Do you really want to remove a city card from a favorites?"}
                                                 onAction={onDelFav} component={
                                    <div data-testid="icon-delFav" className={styles.icon}>
                                        <ToolTip text={"Remove"} icon={<FavoriteIcon/>}/>
                                    </div>}
                                />
                            }
                            {!isFindPath &&
                                <div data-testid="icon-update" onClick={updateCity} className={styles.icon}>
                                    <ToolTip text={"Update the data"} icon={<CachedIcon/>}/>
                                </div>}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card></div>
    );
})