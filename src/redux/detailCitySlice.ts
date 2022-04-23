import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {weatherApi} from "../api";
import {DetailCityStateModel, DetailsStateModel} from "../models/redux/detailCity";
import {mapDetailsToDetailedState} from "../utils/functional";

export const fetchDetailCity = createAsyncThunk(
    "detailCity/getDetailed",
    async ([lat, lon]: number[]) => (
        await weatherApi.getDetailedCityById([lat, lon])
            .then((resp) => {
                return mapDetailsToDetailedState(resp);
            })
    )
);

const initialState = {
    loading: 0,
    hourlyTemp: [],
    details: {} as DetailsStateModel,
    errorDescription: ""
} as DetailCityStateModel;

const detailCitySlice = createSlice({
    name: 'detailCity',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDetailCity.pending.type]: (state) => {
            state.loading = 1;
        },
        [fetchDetailCity.fulfilled.type]: (state, {payload}) => {
            state.hourlyTemp = payload.hourlyTemp;
            state.details = payload.details;
            state.loading = 2;
        },
        [fetchDetailCity.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data";
            state.loading = 3;
        }
    }
});

export default detailCitySlice.reducer;