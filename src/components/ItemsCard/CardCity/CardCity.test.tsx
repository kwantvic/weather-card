import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import store from "../../../redux";
import {CardCity} from "./index";
import {CityStateModel} from "../../../models/redux/findCity";
import userEvent from "@testing-library/user-event";

describe("CARD_CITY", () => {
    const city = {
        id: 1,
        name: "London",
        country: "GB",
        temp: 11,
        weathIcon: "111img",
        weathDescr: "good",
        lat: 11.11,
        lon: 11.11
    } as CityStateModel;

    it("render CARD_CITY", () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        expect(screen.getByTestId("city-card")).toBeInTheDocument();
    });

    it("onClick to icon-update", () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        const btn = screen.getByTestId("icon-update");
        userEvent.click(btn);
    });

    it("onClick to icon-addFav", () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        const btn = screen.getByTestId("icon-addFav");
        userEvent.click(btn);
    });

    it("onClick to icon-delFav", () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        const btn = screen.getByTestId("icon-delFav");
        userEvent.click(btn);
    });

    it("onClick to card", () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        const btn = screen.getByTestId("card");
        userEvent.click(btn);
    });
})