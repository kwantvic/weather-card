import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from "../../redux";
import {Detailed} from "./index";

describe("DETAILED", () => {
    it("renders DETAILED", () => {
        render(<MemoryRouter><Provider store={store}><Detailed/></Provider></MemoryRouter>);
        expect(screen.getByTestId("detailed-page")).toBeInTheDocument();
    });
});