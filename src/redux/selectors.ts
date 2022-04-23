import {useSelector} from "react-redux";
import {RootState} from ".";
import {createSelector} from "reselect";

export function useFindCitySelector() {
    return useSelector((state: RootState) => state.city.findCity);
}

export function useSearchValueSelector() {
    return useSelector((state: RootState) => state.city.searchValue);
}

export function useNameCitySelector() {
    return useSelector((state: RootState) => state.city.nameCity);
}

export function useLoadingFindSelector() {
    return useSelector((state: RootState) => state.city.loading);
}

export function useFavIdSelector() {
    return useSelector((state: RootState) => state.favorite.arrIdFav);
}

export function useFavSelector() {
    return useSelector((state: RootState) => state.favorite.favCity);
}

export function useLoadingFavSelector() {
    return useSelector((state: RootState) => state.favorite.loading);
}

export function useLoadingUpdateSelector() {
    return useSelector((state: RootState) => state.favorite.loadingUpdateCity);
}

export function useUpdateCityIdSelector() {
    return useSelector((state: RootState) => state.favorite.updateCityId);
}

export function useDetailsSelector() {
    return useSelector((state: RootState) => state.detailed.details);
}

export function useHourlySelector() {
    return useSelector((state: RootState) => state.detailed.hourlyTemp);
}

export function useLoadingDetailSelector() {
    return useSelector((state: RootState) => state.detailed.loading);
}

export const detailCitySelector = createSelector(
    (state: RootState) => state.favorite.favCity,
    (state: RootState) => state.city.findCity,
    (_: RootState, id: number) => id,
    (itemsCity, itemsFindCity, id) => {
        return [...itemsCity, ...itemsFindCity].find((obj) => obj.id === id);
    }
);

export const errorDescriptionSelector = createSelector(
    (state: RootState) => state.city.errorDescription,
    (state: RootState) => state.favorite.errorDescription,
    (state: RootState) => state.detailed.errorDescription,
    (cityError, favError, detailError) => {
        if (cityError) {
            return cityError
        } else if (favError) {
            return favError
        } else if (detailError) {
            return detailError
        } else {
            return ""
        }
    }
);