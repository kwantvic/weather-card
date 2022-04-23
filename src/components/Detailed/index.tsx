import React from 'react';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import styles from './Header.module.scss';
import {changeSearchValue, resetFind, setError} from "../../redux/findCitySlice";
import {useSearchValueSelector} from "../../redux/selectors";

export const Header: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchValue = useSearchValueSelector();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(changeSearchValue(e.target.value));
    }

    function toFind() {
        (searchValue.trim().length > 1)
            ? navigate(`/find/${searchValue}`)
            : dispatch(setError("You must enter correct search query "));
    }

    function onEnter(e: React.KeyboardEvent) {
        (e.key === 'Enter') &&
        ((searchValue.trim().length > 1)
            ? navigate(`/find/${searchValue}`)
            : dispatch(setError("You must enter correct search query ")));
    }

    function toMain() {
        dispatch(resetFind());
        navigate("");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span onClick={toMain}><SettingsSystemDaydreamIcon className={styles.icon}/> weather</span>
            </div>
            <div className={styles.search}>
                <div className={styles.form}>
                    <input onKeyDown={(e) => onEnter(e)}
                           onChange={(e) => onChange(e)}
                           className={styles.input}
                           type="text" value={searchValue} placeholder="Weather in your city"/>
                    <button onClick={toFind} className={`${styles.btn} ${styles.btnColor}`}>
                        <SearchIcon className={styles.iconSearch}/>Search
                    </button>
                </div>
            </div>
        </div>
    );
})