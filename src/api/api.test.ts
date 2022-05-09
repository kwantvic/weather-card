import {weatherApi} from "./index";
import {FindLocationModel} from "../models/api/findLocation";
import {instance} from "./api-instance";
import {detailCity} from "../redux/detailCitySlice.test";

const list = [
	{
		id: 1111
	} as FindLocationModel
];
const location = "london";
const group = "1111";
const [lat, lon] = [1111, 1111];

describe("API", () => {

	it("findLocation()", async () => {
		const getSpy = jest.spyOn(instance, "get").mockResolvedValue(Promise.resolve({data: {list}}));
		const result = await weatherApi.findLocation(location);
		expect(getSpy).toBeCalledWith(`/find?q=${location}`);
		expect(result).toBe(list);
	});

	it("getFavCity()", async () => {
		const getSpy = jest.spyOn(instance, "get").mockResolvedValue(Promise.resolve({data: {list}}));
		const result = await weatherApi.getFavCity(group);
		expect(getSpy).toBeCalledWith(`/group?id=${group}`);
		expect(result).toBe(list);
	});

	it("getCityById()", async () => {
		const getSpy = jest.spyOn(instance, "get").mockResolvedValue(Promise.resolve({data: list[0]}));
		const result = await weatherApi.getCityById(1111);
		expect(getSpy).toBeCalledWith(`/weather?id=${1111}`);
		expect(result).toBe(list[0]);
	});

	it("getDetailedCityById()", async () => {
		const getSpy = jest.spyOn(instance, "get").mockResolvedValue(Promise.resolve({data: detailCity}));
		const result = await weatherApi.getDetailedCityById([lat, lon]);
		expect(getSpy).toBeCalledWith(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily`);
		expect(result).toBe(detailCity);
	});
})