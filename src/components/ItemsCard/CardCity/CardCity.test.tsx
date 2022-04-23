import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import store from "../../../redux";
import {CardCity} from "./index";
import {CityStateModel} from "../../../models/redux/findCity";

describe("CARD_CITY", () => {
    const city = {
        id: 1,
        name: "London",
        country: "GB",
        temp: 11,
        weathIcon: "130img",
        weathDescr: "cold",
        lat: 11.11,
        lon: 11.11
    } as CityStateModel

    it("render CARD_CITY", async () => {
        render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
        expect(screen.getByTestId("card-city")).toBeInTheDocument();
    });
})