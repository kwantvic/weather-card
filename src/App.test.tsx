import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import { MemoryRouter } from "react-router-dom";

import {App} from "./App";
import store from "./redux";

describe("APP", () => {

    it("renders APP", () => {
        render (<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("snapshot APP without favItems", () => {
        expect(render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>)).toMatchSnapshot();
    });
})