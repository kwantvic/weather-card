import React from "react";
import {render, screen} from "@testing-library/react";
import {App} from "./App";
import store from "./redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const appTree = (<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>)

describe("App component", () => {
    it("App renders", () => {
        render (appTree);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    })
    it("App snapshot without favItems", () => {
        expect(render(appTree)).toMatchSnapshot();
    })
})
