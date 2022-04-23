import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import * as selectors from "../../../redux/selectors";
import store from "../../../redux";
import {ItemsFavorite} from "./index";
import {CityStateModel} from "../../../models/redux/findCity";
import {LoadingStatus} from "../../../models/redux/LoadingStatus";

describe("ITEMS_FAVORITE", () => {

    it("render without children's", async () => {
        render(<MemoryRouter><Provider store={store}><ItemsFavorite/></Provider></MemoryRouter>);
        expect(screen.queryByTestId("city-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("city-preload")).not.toBeInTheDocument();
    });

    // it("render children: CARD_CITY", async () => {
    //     jest.spyOn(selectors, "useFavSelector").mockReturnValue([{id: 1}] as CityStateModel[]);
    //     jest.spyOn(selectors, "useLoadingFavSelector").mockReturnValue(0 as LoadingStatus);
    //     render(<MemoryRouter><Provider store={store}><ItemsFavorite/></Provider></MemoryRouter>);
    //     expect(screen.findAllByTestId("city-card")).not.toBeInTheDocument();
    //     const cities = screen.findAllByTestId("city-card");
    //     expect(cities.length).toBe(1);
    //     screen.debug();
    // });
})