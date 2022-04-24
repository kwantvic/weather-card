import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import store from "../../../redux";
import {ItemsFind} from "./index";
import * as selectors from "../../../redux/selectors";
import {CityStateModel} from "../../../models/redux/findCity";
import {LoadingStatus} from "../../../models/redux/LoadingStatus";

describe("ITEMS_FIND", () => {

    it("render ITEMS_FIND", async () => {
        render(<MemoryRouter><Provider store={store}><ItemsFind/></Provider></MemoryRouter>);
        expect(screen.getByTestId("find")).toBeInTheDocument();
    });

    it("render children: CARD_CITY", () => {
        jest.spyOn(selectors, "useFindCitySelector").mockReturnValue([{id: 1}] as CityStateModel[]);
        const spyLoadingFav = jest.spyOn(selectors, "useLoadingFavSelector").mockReturnValue(0 as LoadingStatus);
        render(<MemoryRouter><Provider store={store}><ItemsFind/></Provider></MemoryRouter>);
        expect(screen.getByTestId("city-card")).toBeInTheDocument();
        const cities = screen.queryAllByTestId("city-card");
        expect(cities.length).toBe(1);
        spyLoadingFav.mockRestore();
    });
})