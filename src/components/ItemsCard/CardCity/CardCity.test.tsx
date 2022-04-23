import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import store from "../../../redux";
import {ItemsFind} from "./index";

describe("CARD_CITY", () => {

    it("render ITEMS_FIND", async () => {
        render(<MemoryRouter><Provider store={store}><CardCity/></Provider></MemoryRouter>);
        expect(screen.getByTestId("find")).toBeInTheDocument();
    });
})