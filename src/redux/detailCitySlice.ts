import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {CityState} from "./findCitySlice";
import {LoadingStatus} from "../modules/loadingStatus";
import {weatherApi} from "../api";

interface FavCityState {
    arrIdFav: number[],
    loading: LoadingStatus,
    loadingUpdateCity: LoadingStatus,
    favCity: CityState[],
    errorDescription: string,
    updateCityId: number
}

export const fetchFavCity = createAsyncThunk(
    "favCity/getFavCity",
    async (group: string) => (
        await weatherApi.getFavCity(group)
            .then((resp) => {
                let arr = [] as CityState[];
                resp.list.forEach((obj: any) => {
                    arr.push({
                        id: obj.id,
                        name: obj.name,
                        country: obj.sys.country,
                        temp: obj.main.temp,
                        weathIcon: obj.weather[0].icon,
                        weathDescr: obj.weather[0].description
                    });
                })
                return arr;
            })
    )
);

export const fetchUpdateCity = createAsyncThunk(
    "favCity/updateCity",
    async (id: number) => (
        await weatherApi.getCityById(id)
            .then((resp) => {
                return {
                    id: resp.id,
                    name: resp.name,
                    country: resp.sys.country,
                    temp: resp.main.temp,
                    weathIcon: resp.weather[0].icon,
                    weathDescr: resp.weather[0].description
                }
            })
    )
);

const initialState = {
    arrIdFav: [],
    loading: 0,
    loadingUpdateCity: 0,
    favCity: [] as CityState[],
    errorDescription: "",
    updateCityId: 0
} as FavCityState;

const favCitySlice = createSlice({
    name: 'favCity',
    initialState,
    reducers: {
        addLocalFav(state, {payload}) {
            state.arrIdFav = payload;
        },
        addFavId(state, {payload}) {
            state.arrIdFav.push(payload);
        },
        addFavCity(state, {payload}) {
            state.favCity.push(payload);
        },
        delFavId(state, {payload}) {
            state.arrIdFav = state.arrIdFav.filter(x =>  x !== payload);
            state.favCity = state.favCity.filter(obj => obj.id !== payload);
        },
        changeUpdateCityId(state, {payload}) {
            state.updateCityId = payload;
        }
    },
    extraReducers: {
        [fetchFavCity.pending.type]: (state) => {
            state.loading = 1;
        },
        [fetchFavCity.fulfilled.type]: (state, {payload}) => {
            state.favCity = payload;
            state.loading = 2;
        },
        [fetchFavCity.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data";
            state.loading = 3;
        },
        [fetchUpdateCity.pending.type]: (state) => {
            state.loadingUpdateCity = 1;
        },
        [fetchUpdateCity.fulfilled.type]: (state, {payload}) => {
            state.favCity = state.favCity.map((obj) => (obj.id === payload.id ? payload : obj));
            state.loadingUpdateCity = 2;
        },
        [fetchUpdateCity.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data";
            state.loading = 3;
        }
    }
});

export const {addLocalFav, addFavId, delFavId, addFavCity, changeUpdateCityId} = favCitySlice.actions;
export default favCitySlice.reducer;