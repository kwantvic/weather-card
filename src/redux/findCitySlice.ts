import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {weatherApi} from "../api";
import {LoadingStatus} from "../modules/loadingStatus";

export interface CityState {
    id: number,
    name: string,
    country: string,
    temp: number,
    weathIcon: string,
    weathDescr: string
}

interface GetCityState {
    errorDescription: string,
    loading: LoadingStatus,
    findCity: CityState[],
    searchValue: string
}

export const fetchGetCity = createAsyncThunk(
    "getCity/findCity",
    async (location: string) => (
        await weatherApi.getLocation(location)
            .then((resp) => {
                let arrLocation = [] as CityState[];
                resp.list.forEach((obj: any) => {
                    arrLocation.push({
                        id: obj.id,
                        name: obj.name,
                        country: obj.sys.country,
                        temp: obj.main.temp,
                        weathIcon: obj.weather[0].icon,
                        weathDescr: obj.weather[0].description
                    });
                })
                return arrLocation;
            })
    )
);

const initialState = {
    errorDescription: "",
    loading: 0,
    findCity: [] as CityState[],
    searchValue: ""
} as GetCityState;

const getCitySlice = createSlice({
    name: 'getCity',
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
        resetFind(state) {
            state.searchValue = "";
            state.findCity = [];
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
        }
    }
});

export const {setError, resetError, changeSearchValue, resetFind} = getCitySlice.actions;
export default getCitySlice.reducer;