import {DetailedLocationModel} from "../models/api/detailedLocation";
import {weatherApi} from "../api";
import {fetchDetailCity} from "./detailCitySlice";
import store from "./index";

export const detailCity = {
	hourly: [{temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}, {temp: 11}],
	timezone: "Europe/London",
	current: {
		uvi: 1,
		visibility: 10,
		wind_speed: 1,
		wind_deg: 11,
		feels_like: 11,
		pressure: 1111,
		sunrise: 1111,
		sunset: 1111,
		humidity: 1
	}
} as DetailedLocationModel;

describe("DETAIL_CITY_SLICE", () => {
	describe("DETAIL_CITY_SLICE-extraReducers", () => {
		it("fetch detail city", async () => {
			const getSpy = jest.spyOn(weatherApi, "getDetailedCityById").mockResolvedValueOnce(detailCity);
			await store.dispatch(fetchDetailCity([1111, 1111]));
			expect(getSpy).toBeCalledWith([1111, 1111]);
		});

		it("fetch error detail city", async () => {
			const getSpy = jest.spyOn(weatherApi, "getDetailedCityById").mockImplementation(() => {
				throw new Error();
			});
			await store.dispatch(fetchDetailCity([1111, 1111]));
			expect(getSpy).toBeCalledWith([1111, 1111]);
		});
	});
});