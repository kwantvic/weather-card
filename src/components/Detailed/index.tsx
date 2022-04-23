import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import "moment-timezone";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import styles from "./Detailed.module.scss";
import {
    detailCitySelector,
    useDetailsSelector,
    useHourlySelector,
    useLoadingDetailSelector, useLoadingFindSelector
} from "../../redux/selectors";
import {RootState} from "../../redux";
import {fetchDetailCity} from "../../redux/detailCitySlice";
import {OrangeButton} from "../UiComponents/OrangeButton";
import {Alert, CircularProgress} from "@mui/material";
import {fetchGetCityById} from "../../redux/findCitySlice";
import {toTextualDescription} from "../../utils/functional";

export const Detailed: React.FC = React.memo(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const city = useSelector((state: RootState) => detailCitySelector(state, Number(id)));
    const details = useDetailsSelector();
    const hourly = useHourlySelector();
    const loadingDetail = useLoadingDetailSelector();
    const loadingFind = useLoadingFindSelector();

    React.useEffect(() => {
        if (id) {
            city
                ? dispatch(fetchDetailCity([city.lat, city.lon]))
                : dispatch(fetchGetCityById(Number(id)));
        }
    }, [id, city, dispatch]);

    function toBack() {
        navigate(-1);
    }

    return (
        <div className={styles.wrapper}>
            {(loadingDetail === 1 || loadingFind === 1) && <CircularProgress className={styles.progress} color="secondary"/>}
            {(city && loadingDetail === 2)
                ? <div className={styles.infoWrapper}>
                    <div className={styles.info}>
                        <div className={styles.leftInfo}>
                            <div className={styles.data}>{moment.tz(details.timezone).format("MMM D dddd, h:mma")}</div>
                            <div className={styles.city}>{city.name}, {city.country}</div>
                            <div className={styles.temp}>
                                <img alt="icon"
                                     src={`https://openweathermap.org/img/w/${city.weathIcon}.png`}/>
                                <p>{Math.round(city.temp)} C°</p>
                            </div>
                            <div className={styles.desc}>Feels
                                like {Math.round(details.tempFeels)}°C. <span>{city.weathDescr}</span>.
                            </div>
                        </div>
                        <div className={styles.rightInfo}>
                            <div className={styles.cardInfo}>
                                <div><span>💨 Wind:</span> {details.windSpeed}m/s
                                    ({toTextualDescription(details.windDegree)})
                                </div>
                                <div><span>⏲ Pressure:</span> {details.pressure}hPa</div>
                                <div><span>💧 Humidity:</span> {details.humidity}%</div>
                                <div><span>🌈 UV:</span> {Math.round(details.uvi)}</div>
                                <div><span>👁 Visibility:</span> {Math.round(details.visibility / 1000)}km</div>
                                <div>
                                    <span>🌞 Sunrise:</span> {moment(new Date(details.sunrise * 1000)).tz(details.timezone).format("h:mma")}
                                </div>
                                <div>
                                    <span>🌚 Sunset:</span> {moment(new Date(details.sunset * 1000)).tz(details.timezone).format("h:mma")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleHourly}>Forecast for 12 hours</div>
                    <div className={styles.hourlyWrapper}>
                        {hourly.map((temp: number, i) => {
                            return <div key={i} style={{marginBottom: `${temp + 30}px`}}
                                        className={styles.hour}>
                                {temp}°
                            </div>
                        })}
                    </div>
                    <div className={styles.hourlyFooter}>
                        {hourly.map((temp: number, i) => {
                            return <div className={styles.time}
                                        key={i}>{i === 0 ? "now" : moment.tz(details.timezone).add(i, "hours").format("ha")}</div>
                        })}
                    </div>
                </div>
                : (loadingDetail === 3 || loadingFind === 3) &&
                <Alert severity="error">Something went wrong 😏</Alert>
            }
            <div className={styles.btn}><OrangeButton text={"Back"} icon={<ArrowBackIosNewIcon/>} onClick={toBack}/>
            </div>
        </div>
    );
})