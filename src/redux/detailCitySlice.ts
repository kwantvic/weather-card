import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {weatherApi} from "../api";
import {DetailCityStateModel, DetailsStateModel, GetDetailCity} from "../models/redux/detailCity";
import {getError, mapDetailsToDetailedState} from "../utils/functional";
import {ServerError} from "../models/redux/findCity";

export const fetchDetailCity = createAsyncThunk<GetDetailCity, number[], { rejectValue: ServerError }>(
	"detailCity/getDetailed",
	async ([lat, lon], {rejectWithValue}) => {
		try {
			return mapDetailsToDetailedState(await weatherApi.getDetailedCityById([lat, lon]));
		} catch (err: any) {
			return rejectWithValue(getError(err));
		}
	}
);

const initialState: DetailCityStateModel = {
	loading: 0,
	hourlyTemp: [],
	details: {} as DetailsStateModel,
	errorDescription: ""
};

const detailCitySlice = createSlice({
	name: "detailCity",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailCity.pending, (state) => {
				state.loading = 1;
			})
			.addCase(fetchDetailCity.fulfilled, (state, {payload}) => {
				state.hourlyTemp = payload.hourlyTemp;
				state.details = payload.details;
				state.loading = 2;
			})
			.addCase(fetchDetailCity.rejected, (state, action) => {
				console.log("❌ERROR:", action.payload);
				state.errorDescription = `Status ${action.payload!.cod}: ${action.payload!.message}`;
				state.loading = 3;
			})
	}
});

export default detailCitySlice.reducer;