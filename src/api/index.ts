import axios from "axios";

import {FindLocationModel, ListLocationModel} from "../models/api/findLocation";
import {DetailedLocationModel} from "../models/api/detailedLocation";

const apiKey = "4c8694a9460c6b2285498850ef6c022b";

export let instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5"
});

export const weatherApi = {
    findLocation(location: string) {
        return instance
            .get<ListLocationModel>(`/find?q=${location}&units=metric&appid=${apiKey}`)
            .then((resp) => resp.data.list);
    },
    getFavCity(group: string) {
        return instance
            .get<ListLocationModel>(`/group?id=${group}&appid=${apiKey}&units=metric`)
            .then((resp) => resp.data.list);
    },
    getCityById(id: number) {
        return instance
            .get<FindLocationModel>(`/weather?id=${id}&appid=${apiKey}&units=metric`)
            .then((resp) => resp.data);
    },
    getDetailedCityById([lat, lon]: number[]) {
        return instance
            .get<DetailedLocationModel>(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${apiKey}&units=metric`)
            .then((resp) => resp.data);
    }
}