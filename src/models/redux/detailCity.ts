import {LoadingStatus} from "./LoadingStatus";

export interface DetailCityStateModel {
	loading: LoadingStatus,
	errorDescription: string,
	hourlyTemp: number[],
	details: DetailsStateModel
}

export interface DetailsStateModel {
	timezone: string,
	uvi: number,
	visibility: number,
	windSpeed: number,
	windDegree: number,
	pressure: number,
	tempFeels: number,
	sunrise: number,
	sunset: number,
	humidity: number
}

export interface GetDetailCity {
	details: DetailsStateModel,
	hourlyTemp: number[]
}