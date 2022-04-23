import {LoadingStatus} from "../LoadingStatus";
import {CityStateModel} from "./findCity";

export interface FavCityStateModel {
    arrIdFav: number[],
    loading: LoadingStatus,
    loadingUpdateCity: LoadingStatus,
    favCity: CityStateModel[],
    errorDescription: string,
    updateCityId: number
}