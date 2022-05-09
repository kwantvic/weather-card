import store from "./index";
import {
	addFavCity,
	addFavId, addLocalFav,
	changeUpdateCityId,
	delFavId,
	fetchFavCity,
	fetchUpdateCity
} from "./favCitySlice";
import {CityStateModel} from "../models/redux/findCity";
import {FindLocationModel} from "../models/api/findLocation";
import {weatherApi} from "../api";

const newCity: CityStateModel = {
	id: 7777,
	name: "London",
	country: "GB",
	temp: 22,
	weathIcon: "img7777",
	weathDescr: "good",
	lat: 7777,
	lon: 7777
};

export const fakeRespGetFavCity: FindLocationModel[] = [
	{
		id: 7777,
		name: "London",
		sys: {country: "GB"},
		main: {temp: 22},
		weather: [{icon: "img7777", description: "good"}],
		coord: {lat: 7777, lon: 7777}
	},
	{
		id: 8888,
		name: "Dubai",
		sys: {country: "AE"},
		main: {temp: 33},
		weather: [{icon: "img8888", description: "fry"}],
		coord: {lat: 8888, lon: 8888}
	}
];

describe("FAV_CITY_SLICE", () => {
	let state = store.getState().favorite;
	const initIdFavCount = state.arrIdFav.length;

	describe("FAV_CITY_SLICE-reducers", () => {

		it("get local favorites to state at the beginning", () => {
			store.dispatch(addLocalFav([1111, 2222, 3333, 4444, 5555]));
			let state = store.getState().favorite;
			const someNewNumberAddFav = state.arrIdFav.find((x) => x === 3333);
			expect(someNewNumberAddFav).toBe(3333);
			expect(state.arrIdFav.length).toBeGreaterThan(state.favCity.length);
			expect(state.arrIdFav.length).toEqual(5);
		});

		it("add favorites-id to state", () => {
			store.dispatch(addFavId(6666));
			state = store.getState().favorite;
			const addNumber = state.arrIdFav.find((x) => x === 6666);
			expect(addNumber).toBe(6666);
			expect(state.arrIdFav.length).toBeGreaterThan(initIdFavCount);
			expect(state.arrIdFav.length).toEqual(6);
		});

		it("add city to favorites cities", () => {
			store.dispatch(addFavCity(newCity));
			state = store.getState().favorite;
			const newAddCity = state.favCity.find((obj) => obj.id === 7777);
			expect(newAddCity).toEqual(newCity);
			expect(state.favCity.length).toBe(1);
		});

		it("del city from state", () => {
			store.dispatch(addFavId(7777));
			// todo: 💊refactor more call state
			state = store.getState().favorite;
			expect(state.arrIdFav.length).toBe(7);
			store.dispatch(delFavId(7777));
			state = store.getState().favorite;
			const delNumber = state.arrIdFav.find((x) => x === 7777);
			expect(delNumber).toEqual(undefined);
			expect(state.arrIdFav.length).toBe(6);
			const delCity = state.favCity.find((obj) => obj.id === 7777);
			expect(delCity).toEqual(undefined);
			expect(state.favCity.length).toBe(0);
		});

		it("change update city-id", () => {
			expect(state.updateCityId).toBe(0);
			store.dispatch(changeUpdateCityId(7777));
			state = store.getState().favorite;
			expect(state.updateCityId).toBe(7777);
		});
	});

	describe("FAV_CITY_SLICE-extraReducers", () => {
		const group = [7777, 8888].join();

		it("fetch favorites cities", async () => {
			const getSpy = jest.spyOn(weatherApi, "getFavCity").mockResolvedValueOnce(fakeRespGetFavCity);
			await store.dispatch(fetchFavCity(group));
			expect(getSpy).toBeCalledWith(group);
		});

		it("fetch error favorites cities", async () => {
			const getSpy = jest.spyOn(weatherApi, "getFavCity").mockImplementation(() => {
				throw new Error();
			});
			await store.dispatch(fetchFavCity(group));
			expect(getSpy).toBeCalledWith(group);
		});

		it("fetch update city", async () => {
			const getSpy = jest.spyOn(weatherApi, "getCityById").mockResolvedValueOnce(fakeRespGetFavCity[0]);
			await store.dispatch(fetchUpdateCity(7777));
			expect(getSpy).toBeCalledWith(7777);
		});

		it("fetch error update city", async () => {
			const getSpy = jest.spyOn(weatherApi, "getCityById").mockImplementation(() => {
				throw new Error();
			});
			await store.dispatch(fetchUpdateCity(7777));
			expect(getSpy).toBeCalledWith(7777);
		});
	});
});