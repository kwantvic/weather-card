import store from "./index";
import {
	changeNameCity,
	changeSearchValue,
	fetchGetCity,
	fetchGetCityById,
	resetError,
	resetFind,
	setError
} from "./findCitySlice";
import {weatherApi} from "../api";
import {fakeRespGetFavCity} from "./favCitySlice.test";

describe("FIND_CITY_SLICE", () => {
	let state = store.getState().city;

	describe("FIND_CITY_SLICE-reducers", () => {
		it("set error", () => {
			store.dispatch(setError("error"));
			state = store.getState().city;
			expect(state.errorDescription).toBe("error");
		});

		it("resetError", () => {
			store.dispatch(resetError());
			state = store.getState().city;
			expect(state.errorDescription).toBe("");
		});

		it("change search value", () => {
			store.dispatch(changeSearchValue("london"));
			state = store.getState().city;
			expect(state.searchValue).toBe("london");
		});

		it("change name city", () => {
			store.dispatch(changeNameCity("london"));
			state = store.getState().city;
			expect(state.nameCity).toBe("london");
		});

		it("reset find", () => {
			store.dispatch(resetFind());
			state = store.getState().city;
			expect(state.searchValue).toBe("");
			expect(state.loading).toBe(0);
		});
	});

	describe("FIND_CITY_SLICE-extraReducers", () => {
		const location = "london";

		it("fetch get city", async () => {
			const getSpy = jest.spyOn(weatherApi, "findLocation").mockResolvedValueOnce(fakeRespGetFavCity);
			await store.dispatch(fetchGetCity(location));
			expect(getSpy).toBeCalledWith(location);
		});

		it("fetch get city by id", async () => {
			const getSpy = jest.spyOn(weatherApi, "getCityById").mockResolvedValueOnce(fakeRespGetFavCity[0]);
			await store.dispatch(fetchGetCityById(7777));
			expect(getSpy).toBeCalledWith(7777);
		});

		it("fetch error", async () => {
			let getFindLocationSpy = jest.spyOn(weatherApi, "findLocation").mockImplementation(() => {
				throw new Error();
			});
			let getCityByIdSpy = jest.spyOn(weatherApi, "getCityById").mockImplementation(() => {
				throw new Error();
			});
			await store.dispatch(fetchGetCity(location));
			expect(getFindLocationSpy).toBeCalledWith(location);
			await store.dispatch(fetchGetCityById(7777));
			expect(getCityByIdSpy).toBeCalledWith(7777);
		});
	});
});