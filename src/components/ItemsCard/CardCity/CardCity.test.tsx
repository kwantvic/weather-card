import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import store from "../../../redux";
import {CardCity} from "./index";
import {CityStateModel} from "../../../models/redux/findCity";
import userEvent from "@testing-library/user-event";
import {getLocalFav} from "../../../utils/functional";
import {CardCityPreloader} from "./CardCityPreloader";

jest.mock("../../../utils/functional", () => ({
	...(jest.requireActual("../../../utils/functional")),
	getLocalFav: jest.fn()
}));

describe("CARD_CITY", () => {
	const city = {
		id: 1111,
		name: "London",
		country: "GB",
		temp: 11,
		weathIcon: "111img",
		weathDescr: "good",
		lat: 11.11,
		lon: 11.11
	} as CityStateModel;

	it("render CARD_CITY_PRELOADER", () => {
		render(<MemoryRouter><Provider store={store}><CardCityPreloader/></Provider></MemoryRouter>);
		expect(screen.getByTestId("city-preload")).toBeInTheDocument();
	});

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

	it("onClick to icon-delFav without local favorites cities", () => {
		(getLocalFav as jest.Mock).mockReturnValue(false);
		expect(getLocalFav()).toEqual(false);
		render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
		const btn = screen.getByTestId("icon-delFav");
		userEvent.click(btn);
		const btnConfirm = screen.getByRole("button", {
			name: /yes/i
		});
		userEvent.click(btnConfirm);
	});

	it("onClick to icon-delFav with local favorites cities", () => {
		(getLocalFav as jest.Mock).mockReturnValue("[1111]");
		expect(getLocalFav()).toEqual("[1111]");
		render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
		const btnAdd = screen.getByTestId("icon-addFav");
		userEvent.click(btnAdd);
		const btnDel = screen.getByTestId("icon-delFav");
		userEvent.click(btnDel);
		const btnConfirm = screen.getByRole("button", {
			name: /yes/i
		});
		userEvent.click(btnConfirm);
	});

	it("onClick to card", () => {
		render(<MemoryRouter><Provider store={store}><CardCity city={city}/></Provider></MemoryRouter>);
		const btn = screen.getByTestId("card");
		userEvent.click(btn);
	});
})