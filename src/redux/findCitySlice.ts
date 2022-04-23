import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {weatherApi} from "../api";
import {CityStateModel, FindCityStateModel} from "../models/redux/findCity";
import {mapLocationToCityState} from "../utils/functional";

export const fetchGetCity = createAsyncThunk(
    "findCity/findLocation",
    async (location: string) => (
        await weatherApi.findLocation(location)
            .then((resp) => {
                return resp.map(mapLocationToCityState);
            })
    )
);

export const fetchGetCityById = createAsyncThunk(
    "findCity/findCityById",
    async (id: number) => (
        await weatherApi.getCityById(id)
            .then((resp) => {
                return mapLocationToCityState(resp);
            })
    )
);

const initialState = {
    errorDescription: "",
    loading: 0,
    findCity: [] as CityStateModel[],
    searchValue: "",
    nameCity: ""
} as FindCityStateModel;

const findCitySlice = createSlice({
    name: "getCity",
    initialState,
    reducers: {
        setError(state, {payload}) {
            state.errorDescription = payload;
        },
        resetError(state, {payload}) {
            state.errorDescription = payload;
        },
        changeSearchValue(state, {payload}) {
            state.searchValue = payload;
        },
        changeNameCity(state, {payload}) {
            state.nameCity = payload;
        },
        resetFind(state) {
            state.searchValue = "";
            state.loading = 0;
        }
    },
    extraReducers: {
        [fetchGetCity.pending.type]: (state) => {
            state.loading = 1;
        },
        [fetchGetCity.fulfilled.type]: (state, {payload}) => {
            state.findCity = payload;
            state.loading = 2;
        },
        [fetchGetCity.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data.";
            state.findCity = [];
            state.loading = 3;
        },
        [fetchGetCityById.pending.type]: (state) => {
            state.loading = 1;
        },
        [fetchGetCityById.fulfilled.type]: (state, {payload}) => {
            state.findCity = [payload];
            state.loading = 2;
        },
        [fetchGetCityById.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data.";
            state.findCity = [];
            state.loading = 3;
        }
    }
});

export const {setError, resetError, changeSearchValue, resetFind, changeNameCity} = findCitySlice.actions;
export default findCitySlice.reducer;