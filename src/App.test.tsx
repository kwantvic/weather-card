import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import {App} from "./App";
import store from "./redux";
import {getLocalFav} from "./utils/functional";

jest.mock("./utils/functional", () => ({
	...(jest.requireActual("./utils/functional")),
	getLocalFav: jest.fn()
}));

describe("APP", () => {

	it("renders APP", () => {
		render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("snapshot APP without favItems", () => {
		expect(render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>)).toMatchSnapshot();
	});

	it("renders APP without local favorites cities", () => {
		(getLocalFav as jest.Mock).mockReturnValue("[]");
		expect(getLocalFav()).toEqual("[]");
		render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>);
		expect(screen.queryByTestId("city-preload")).not.toBeInTheDocument();
	});

	it("renders APP with local favorites cities", () => {
		(getLocalFav as jest.Mock).mockReturnValue("[1111, 2222]");
		expect(getLocalFav()).toEqual("[1111, 2222]");
		render(<MemoryRouter><Provider store={store}><App/></Provider></MemoryRouter>);
		expect(screen.getAllByTestId("city-preload")[0]).toBeInTheDocument();
	});
})