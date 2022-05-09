import {FindLocationModel, ListLocationModel} from "../models/api/findLocation";
import {DetailedLocationModel} from "../models/api/detailedLocation";
import {instance} from "./api-instance";

export const weatherApi = {
	findLocation(location: string) {
		return instance
			.get<ListLocationModel>(`/find?q=${location}`)
			.then((resp) => resp.data.list);
	},
	getFavCity(group: string) {
		return instance
			.get<ListLocationModel>(`/group?id=${group}`)
			.then((resp) => resp.data.list);
	},
	getCityById(id: number) {
		return instance
			.get<FindLocationModel>(`/weather?id=${id}`)
			.then((resp) => resp.data);
	},
	getDetailedCityById([lat, lon]: number[]) {
		return instance
			.get<DetailedLocationModel>(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily`)
			.then((resp) => resp.data);
	}
}