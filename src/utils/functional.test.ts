import {
	getError,
	getLocalFav,
	mapDetailsToDetailedState,
	mapLocationToCityState,
	setLocalFav,
	toTextualDescription
} from "./functional";
import {favorites} from "./variables";
import {FindLocationModel} from "../models/api/findLocation";
import {CityStateModel, ServerError} from "../models/redux/findCity";
import {DetailedLocationModel} from "../models/api/detailedLocation";
import {DetailsStateModel} from "../models/redux/detailCity";

const cityById = {
	"coord": {
		"lon": -0.1257,
		"lat": 51.5085
	},
	"weather": [
		{
			"description": "few clouds",
			"icon": "02d"
		}
	],
	"base": "stations",
	"main": {
		"temp": 17.21,
		"feels_like": 16.84,
		"temp_min": 15.84,
		"temp_max": 18.86,
		"pressure": 1026,
		"humidity": 71
	},
	"visibility": 10000,
	"wind": {
		"speed": 6.69,
		"deg": 90
	},
	"clouds": {
		"all": 20
	},
	"dt": 1651942485,
	"sys": {
		"type": 2,
		"id": 2019646,
		"country": "GB",
		"sunrise": 1651897304,
		"sunset": 1651951942
	},
	"timezone": 3600,
	"id": 2643743,
	"name": "London",
	"cod": 200
} as FindLocationModel;
const cityDetail = {
	"lat": 51.5085,
	"lon": -0.1257,
	"timezone": "Europe/London",
	"timezone_offset": 3600,
	"current": {
		"dt": 1651943281,
		"sunrise": 1651897304,
		"sunset": 1651951942,
		"temp": 17.19,
		"feels_like": 16.82,
		"pressure": 1026,
		"humidity": 71,
		"dew_point": 11.89,
		"uvi": 0.87,
		"clouds": 20,
		"visibility": 10000,
		"wind_speed": 4.63,
		"wind_deg": 80,
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		]
	},
	"hourly": [
		{
			"temp": 17.19
		},
		{
			"temp": 16.7
		},
		{
			"temp": 15.73
		},
		{
			"temp": 14.65
		},
		{
			"temp": 13.57,
		},
		{
			"temp": 13.11
		},
		{
			"temp": 10.86
		},
		{
			"temp": 9.73
		},
		{
			"temp": 9.11
		},
		{
			"temp": 8.58
		},
		{
			"temp": 8.13
		},
		{
			"temp": 7.68
		}
	]
} as DetailedLocationModel;
const resCityById = {
	id: 2643743,
	name: "London",
	country: "GB",
	temp: 17.21,
	weathIcon: "02d",
	weathDescr: "few clouds",
	lat: 51.5085,
	lon: -0.1257
} as CityStateModel;
export const resCityDetail = {
	hourlyTemp: [
		17,
		17,
		16,
		15,
		14,
		13,
		11,
		10,
		9,
		9,
		8,
		8
	] as number[],
	details: {
		timezone: 'Europe/London',
		uvi: 0.87,
		visibility: 10000,
		windSpeed: 4.63,
		windDegree: 80,
		pressure: 1026,
		tempFeels: 16.82,
		sunrise: 1651897304,
		sunset: 1651951942,
		humidity: 71
	} as DetailsStateModel
};
const serverError = {
	"cod": 401,
	"message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
} as ServerError;
const axiosError = {
	response: {
		data: {
			cod: 401,
			message: "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
		}
	}
};

const mockSetItem = jest.spyOn(Storage.prototype, "setItem");
const mockGetItem = jest.spyOn(Storage.prototype, "getItem");

beforeEach(() => {
	jest.clearAllMocks();
});

describe("FUNCTIONAL", () => {

	it("getLocalFav()", () => {
		getLocalFav();
		expect(mockGetItem).toBeCalledWith(favorites);
	});

	it("setLocalFav()", () => {
		setLocalFav([1111, 2222]);
		expect(mockSetItem).toBeCalledWith(favorites, "[1111,2222]");
	});

	it("toTextualDescription()  (degree > 0)", () => {
		expect(toTextualDescription(162)).toBe("Southerly");
	});

	it("toTextualDescription()  (degree < 0)", () => {
		expect(toTextualDescription(-162)).toBe("Southerly");
	});

	it("mapLocationToCityState()", () => {
		expect(mapLocationToCityState(cityById)).toEqual(resCityById);
	});

	it("mapDetailsToDetailedState()", () => {
		expect(mapDetailsToDetailedState(cityDetail)).toEqual(resCityDetail);
	});
	
	it("getError() with response", () => {
	expect(getError(axiosError)).toEqual(serverError)
	});

	it("getError() without response", () => {
	expect(getError("error")).toEqual({message: "Error loading data"})
	});
});