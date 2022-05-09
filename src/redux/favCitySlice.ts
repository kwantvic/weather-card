import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";

import {weatherApi} from "../api";
import {CityStateModel, ServerError} from "../models/redux/findCity";
import {FavCityStateModel} from "../models/redux/favCity";
import {getError, mapLocationToCityState} from "../utils/functional";

export const fetchFavCity = createAsyncThunk<CityStateModel[], string, { rejectValue: ServerError }>(
	"favCity/getFavCity",
	async (group, {rejectWithValue}) => {
		try {
			return (await weatherApi.getFavCity(group)).map(mapLocationToCityState);
		} catch (err: any) {
			return rejectWithValue(getError(err));
		}
	}
);

export const fetchUpdateCity = createAsyncThunk<CityStateModel, number, { rejectValue: ServerError }>(
	"favCity/updateCity",
	async (id, {rejectWithValue}) => {
		try {
			return mapLocationToCityState(await weatherApi.getCityById(id));
		} catch (err: any) {
			return rejectWithValue(getError(err));
		}
	}
);

const initialState: FavCityStateModel = {
	arrIdFav: [],
	loading: 0,
	loadingUpdateCity: 0,
	favCity: [] as CityStateModel[],
	errorDescription: "",
	updateCityId: 0
};

const favCitySlice = createSlice({
	name: "favCity",
	initialState,
	reducers: {
		addLocalFav(state, {payload}: PayloadAction<number[]>) {
			state.arrIdFav = payload;
		},
		addFavId(state, {payload}: PayloadAction<number>) {
			state.arrIdFav.push(payload);
		},
		addFavCity(state, {payload}: PayloadAction<CityStateModel>) {
			state.favCity.push(payload);
		},
		delFavId(state, {payload}: PayloadAction<number>) {
			state.arrIdFav = state.arrIdFav.filter(x => x !== payload);
			state.favCity = state.favCity.filter(obj => obj.id !== payload);
		},
		changeUpdateCityId(state, {payload}: PayloadAction<number>) {
			state.updateCityId = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavCity.pending, (state) => {
				state.loading = 1;
			})
			.addCase(fetchFavCity.fulfilled, (state, {payload}) => {
				state.favCity = payload;
				state.loading = 2;
			})
			.addCase(fetchUpdateCity.pending, (state) => {
				state.loadingUpdateCity = 1;
			})
			.addCase(fetchUpdateCity.fulfilled, (state, {payload}) => {
				state.favCity = state.favCity.map((obj) => (obj.id === payload.id ? {
					...obj,
					temp: payload.temp,
					weathDescr: payload.weathDescr,
					weathIcon: payload.weathIcon
				} : obj));
				state.loadingUpdateCity = 2;
			})
			.addMatcher(isRejectedWithValue(fetchFavCity, fetchUpdateCity), (state, action) => {
				console.log("❌ERROR:", action.payload);
				state.errorDescription = `Status ${action.payload!.cod}: ${action.payload!.message}`;
				state.loading = 3;
			});
	}
});

export const {addLocalFav, addFavId, delFavId, addFavCity, changeUpdateCityId} = favCitySlice.actions;
export default favCitySlice.reducer;