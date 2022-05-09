import {useSelector} from "react-redux";
import {createSelector} from "reselect";

import {RootState} from ".";

const detailCitySelector = createSelector(
	(state: RootState) => state.favorite.favCity,
	(state: RootState) => state.city.findCity,
	(_: RootState, id: number) => id,
	(itemsCity, itemsFindCity, id) => {
		return [...itemsCity, ...itemsFindCity].find((obj) => obj.id === id);
	}
);

const errorDescriptionSelector = createSelector(
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

function useFindCitySelector() {
	return useSelector((state: RootState) => state.city.findCity);
}

function useSearchValueSelector() {
	return useSelector((state: RootState) => state.city.searchValue);
}

function useNameCitySelector() {
	return useSelector((state: RootState) => state.city.nameCity);
}

function useLoadingFindSelector() {
	return useSelector((state: RootState) => state.city.loading);
}

function useFavIdSelector() {
	return useSelector((state: RootState) => state.favorite.arrIdFav);
}

function useFavSelector() {
	return useSelector((state: RootState) => state.favorite.favCity);
}

function useLoadingFavSelector() {
	return useSelector((state: RootState) => state.favorite.loading);
}

function useLoadingUpdateSelector() {
	return useSelector((state: RootState) => state.favorite.loadingUpdateCity);
}

function useUpdateCityIdSelector() {
	return useSelector((state: RootState) => state.favorite.updateCityId);
}

function useDetailsSelector() {
	return useSelector((state: RootState) => state.detailed.details);
}

function useHourlySelector() {
	return useSelector((state: RootState) => state.detailed.hourlyTemp);
}

function useLoadingDetailSelector() {
	return useSelector((state: RootState) => state.detailed.loading);
}

function useDetailCitySelector(id: number) {
	return useSelector((state: RootState) => detailCitySelector(state, Number(id)));
}

function useErrorSelector() {
	return useSelector((state: RootState) => errorDescriptionSelector(state));
}

export {
	useLoadingFavSelector,
	useHourlySelector,
	useLoadingFindSelector,
	useLoadingDetailSelector,
	useLoadingUpdateSelector,
	useNameCitySelector,
	useUpdateCityIdSelector,
	useDetailsSelector,
	useFindCitySelector,
	useFavIdSelector,
	useSearchValueSelector,
	useFavSelector,
	useDetailCitySelector,
	useErrorSelector
}