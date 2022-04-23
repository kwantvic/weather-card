import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {countryCodeEmoji} from 'country-code-emoji';
import CachedIcon from '@mui/icons-material/Cached';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useDispatch} from 'react-redux';

import styles from './CardCity.module.scss';
import {ToolTip} from "../ToolTip"
import {useLocation} from "react-router-dom";
import {useFavSelector} from "../../../redux/selectors";
import {addFav, delFav} from "../../../redux/favCitySlice";
import {getLocalFav, setLocalFav} from "../../../utils/functional";

export interface FindCityState {
    id?: number,
    name?: string,
    country?: string,
    temp?: number,
    weathIcon?: string,
    weathDescr?: string
}

interface CardCityProps {
    city: FindCityState
}

export const CardCity: React.FC<CardCityProps> = React.memo(({city}) => {
    const dispatch = useDispatch();
    const isFindPath = useLocation().pathname.includes("/find/");
    const fav = useFavSelector();
    console.log("🧲", fav)

    function clickCard() {
        console.log("🧲click card")
    }

    function onDelFav(id: number) {
        dispatch(delFav(id));
        if (getLocalFav()) {
            let arr: number[] = JSON.parse(getLocalFav()!);
            (arr.length > 0) && setLocalFav(arr.filter(x => x !== id));
        } else {
            setLocalFav([]);
        }
    }

    function onAddFav(id: number) {
        dispatch(addFav(id));
        if (getLocalFav()) {
            let arr: number[] = JSON.parse(getLocalFav()!);
            arr.push(id)
            setLocalFav(arr);
        } else {
            setLocalFav([id])
        }
    }

    function clickIcon(e: React.MouseEvent) {
        city.id && (fav.includes(city.id) ? onDelFav(city.id) : onAddFav(city.id));
        e.stopPropagation();
    }

    return (
        <Card className={styles.wrapper} onClick={clickCard}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {city.name} {city.country && countryCodeEmoji(city.country)}
                    </Typography>
                    <Typography variant="h1" color="secondary">
                        {city.temp ? Math.round(city.temp) : `--`}°<img alt="icon"
                                                                        src={`https://openweathermap.org/img/w/${city.weathIcon}.png`}
                                                                        width="120" height="100"/>
                    </Typography>
                    <Typography color="text.disabled" gutterBottom variant="h6" component="div">
                        {city.weathDescr}
                    </Typography>
                    <div className={styles.icons}>
                        <div className={styles.icon} onClick={clickIcon}>
                            {city.id &&
                                (!fav.includes(city.id)
                                    ? <ToolTip text={"Bookmark it"} icon={<FavoriteBorderIcon/>}/>
                                    : <ToolTip text={"Remove"} icon={<FavoriteIcon/>}/>)
                            }
                        </div>
                        {!isFindPath &&
                            <div className={styles.icon}>
                                <ToolTip text={"Update the data"} icon={<CachedIcon/>}/>
                            </div>}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
})