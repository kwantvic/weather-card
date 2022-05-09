import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from "../../redux";
import {Detailed} from "./index";
import userEvent from "@testing-library/user-event";
import {
	useDetailCitySelector,
	useHourlySelector,
	useLoadingDetailSelector,
	useLoadingFindSelector
} from "../../redux/selectors";
import {DetailCityStateModel} from "../../models/redux/detailCity";

const detailedCity = {
	loading: 1,
	hourlyTemp: [
		14,
		14,
		15,
		16,
		17,
		18,
		17,
		17,
		16,
		14,
		12,
		11
	],
	details: {
		timezone: 'Europe/London',
		uvi: 3.18,
		visibility: 10000,
		windSpeed: 4.12,
		windDegree: 90,
		pressure: 1028,
		tempFeels: 12.81,
		sunrise: 1651983601,
		sunset: 1652038439,
		humidity: 64
	},
	errorDescription: ''
} as DetailCityStateModel;

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({
		id: "2643743",
	}),
}));

// jest.mock("react-redux", () => ({
// 	useSelector: jest.fn().mockImplementation(selector => selector()),
// }));

jest.mock("../../redux/selectors", () => ({
	...(jest.requireActual("../../redux/selectors")),
	useHourlySelector: jest.fn(),
	useLoadingDetailSelector: jest.fn(),
	useLoadingFindSelector: jest.fn(),
	useDetailCitySelector: jest.fn()
}));

describe("DETAILED", () => {

	it("renders DETAILED", () => {
		render(<MemoryRouter><Provider store={store}><Detailed/></Provider></MemoryRouter>);
		expect(screen.getByTestId("detailed-page")).toBeInTheDocument();
	});

	it("toBack()", () => {
		render(<MemoryRouter><Provider store={store}><Detailed/></Provider></MemoryRouter>);
		const btnBack = screen.getByRole("button", {
			name: /Back/i
		});
		userEvent.click(btnBack);
	});

	it("renders DETAILED with CIRCULAR_PROGRESS", () => {
		(useLoadingDetailSelector as jest.Mock).mockReturnValue(1);
		(useLoadingFindSelector as jest.Mock).mockReturnValue(1);
		render(<MemoryRouter><Provider store={store}><Detailed/></Provider></MemoryRouter>);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});
});