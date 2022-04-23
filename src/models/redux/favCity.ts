import {LoadingStatus} from "../LoadingStatus";

export interface CityStateModel {
    id: number,
    name: string,
    country: string,
    temp: number,
    weathIcon: string,
    weathDescr: string,
    lat: number,
    lon: number
}

export interface FindCityStateModel {
    errorDescription: string,
    loading: LoadingStatus,
    findCity: CityStateModel[],
    searchValue: string
}