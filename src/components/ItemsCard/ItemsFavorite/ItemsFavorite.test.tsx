import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import * as selectors from "../../../redux/selectors";
import store from "../../../redux";
import {ItemsFavorite} from "./index";
import {CityStateModel} from "../../../models/redux/findCity";
import {LoadingStatus} from "../../../models/redux/LoadingStatus";

describe("ITEMS_FAVORITE", () => {

    it("render without children's",() => {
        render(<MemoryRouter><Provider store={store}><ItemsFavorite/></Provider></MemoryRouter>);
        expect(screen.queryByTestId("city-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("city-preload")).not.toBeInTheDocument();
    });

    it("render children: CARD_CITY", () => {
        jest.spyOn(selectors, "useFavSelector").mockReturnValue([{id: 1}] as CityStateModel[]);
        const spyLoadingFav = jest.spyOn(selectors, "useLoadingFavSelector").mockReturnValue(0 as LoadingStatus);
        render(<MemoryRouter><Provider store={store}><ItemsFavorite/></Provider></MemoryRouter>);
        expect(screen.getByTestId("city-card")).toBeInTheDocument();
        const cities = screen.queryAllByTestId("city-card");
        expect(cities.length).toBe(1);
        spyLoadingFav.mockRestore();
    });

    it("render children: PRELOAD_CITY", () => {
        jest.spyOn(selectors, "useFavSelector").mockReturnValue([{id: 1}, {id: 2}] as CityStateModel[]);
        jest.spyOn(selectors, "useFavIdSelector").mockReturnValue([1, 2] as number[]);
        const spyLoadingFav = jest.spyOn(selectors, "useLoadingFavSelector").mockReturnValue(1 as LoadingStatus);
        render(<MemoryRouter><Provider store={store}><ItemsFavorite/></Provider></MemoryRouter>);
        expect(screen.getAllByTestId("city-preload")[0]).toBeInTheDocument();
        const cities = screen.getAllByTestId("city-preload");
        expect(cities.length).toBe(2);
        spyLoadingFav.mockRestore();
    })
})