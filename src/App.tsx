import React from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";

import {Header} from "./components/Header";
import {ItemsFind} from "./components/ItemsCard/ItemsFind";
import {ActionAlerts} from "./components/UiComponents/ActionAlerts";
import {useErrorSelector} from "./redux/selectors";
import {ItemsFavorite} from "./components/ItemsCard/ItemsFavorite";
import {Detailed} from "./components/Detailed";
import {getLocalFav, setLocalFav} from "./utils/functional";
import {addLocalFav} from "./redux/favCitySlice";
import {NotFound} from "./components/NotFound";

export const App: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const errorSelector = useErrorSelector();

    React.useEffect(() => {
        if (getLocalFav()) {
            let arr: number[] = JSON.parse(getLocalFav()!);
            if (arr.length > 0)  {
                dispatch(addLocalFav(arr));
            }
        } else {
            setLocalFav([]);
        }
    }, [dispatch]);

    return (
        <div>
            <ActionAlerts severity={"error"} errorDescription={errorSelector}/>
            <Header/>
            <Routes>
                <Route path="/" element={<ItemsFavorite/>}/>
                <Route path="/find/:location" element={<ItemsFind/>}/>
                <Route path="/detailed/:id" element={<Detailed/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
})