import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";

import {weatherApi} from "../api";
import {CityStateModel, FindCityStateModel, ServerError} from "../models/redux/findCity";
import {getError, mapLocationToCityState} from "../utils/functional";

export const fetchGetCity = createAsyncThunk<CityStateModel[], string, { rejectValue: ServerError }>(
	"findCity/findLocation",
	async (location, {rejectWithValue}) => {
		try {
			return (await weatherApi.findLocation(location)).map(mapLocationToCityState);
		} catch (err: any) {
			return rejectWithValue(getError(err));
		}
	}
);

export const fetchGetCityById = createAsyncThunk<CityStateModel, number, { rejectValue: ServerError }>(
	"findCity/findCityById",
	async (id, {rejectWithValue}) => {
		try {
			return mapLocationToCityState(await weatherApi.getCityById(id));
		} catch (err: any) {
			return rejectWithValue(getError(err));
		}
	}
);

const initialState: FindCityStateModel = {
	errorDescription: "",
	loading: 0,
	findCity: [] as CityStateModel[],
	searchValue: "",
	nameCity: ""
};

const findCitySlice = createSlice({
	name: "getCity",
	initialState,
	reducers: {
		setError(state, {payload}: PayloadAction<string>) {
			state.errorDescription = payload;
		},
		resetError(state) {
			state.errorDescription = "";
		},
		changeSearchValue(state, {payload}: PayloadAction<string>) {
			state.searchValue = payload;
		},
		changeNameCity(state, {payload}: PayloadAction<string>) {
			state.nameCity = payload;
		},
		resetFind(state) {
			state.searchValue = "";
			state.loading = 0;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetCity.pending, (state) => {
				state.loading = 1;
			})
			.addCase(fetchGetCity.fulfilled, (state, {payload}) => {
				state.findCity = payload;
				state.loading = 2;
			})
			.addCase(fetchGetCityById.pending, (state) => {
				state.loading = 1;
			})
			.addCase(fetchGetCityById.fulfilled, (state, {payload}) => {
				state.findCity = [payload];
				state.loading = 2;
			})
			.addMatcher(isRejectedWithValue(fetchGetCity, fetchGetCityById), (state, action) => {
				console.log("❌ERROR:", action.payload);
				state.errorDescription = `Status ${action.payload!.cod}: ${action.payload!.message}`;
				state.findCity = [];
				state.loading = 3;
			});
	}
});

export const {setError, resetError, changeSearchValue, resetFind, changeNameCity} = findCitySlice.actions;
export default findCitySlice.reducer;