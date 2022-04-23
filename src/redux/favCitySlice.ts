import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {weatherApi} from "../api";
import {CityStateModel} from "../models/redux/findCity";
import {FavCityStateModel} from "../models/redux/favCity";
import {mapLocationToCityState} from "../utils/functional";

export const fetchFavCity = createAsyncThunk(
    "favCity/getFavCity",
    async (group: string) => (
        await weatherApi.getFavCity(group)
            .then((resp) => {
                return resp.map(mapLocationToCityState);
            })
    )
);

export const fetchUpdateCity = createAsyncThunk(
    "favCity/updateCity",
    async (id: number) => (
        await weatherApi.getCityById(id)
            .then((resp) => {
                return mapLocationToCityState(resp);
            })
    )
);

const initialState = {
    arrIdFav: [],
    loading: 0,
    loadingUpdateCity: 0,
    favCity: [] as CityStateModel[],
    errorDescription: "",
    updateCityId: 0
} as FavCityStateModel;

const favCitySlice = createSlice({
    name: "favCity",
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
            state.arrIdFav = state.arrIdFav.filter(x => x !== payload);
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
            state.favCity = state.favCity.map((obj) => (obj.id === payload.id ? {...obj, temp: payload.temp, weathDescr: payload.weathDescr, weathIcon: payload.weathIcon} : obj));
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