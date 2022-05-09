import React from "react";
import {act, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from "../../../redux";
import {ActionAlerts} from "./index";

jest.useFakeTimers();

describe("ACTION_ALERT", () => {

	it("renders ACTION_ALERT with error", () => {
		render(<MemoryRouter><Provider store={store}>
			<ActionAlerts severity="error" errorDescription="fake-error"/>
		</Provider></MemoryRouter>);
		expect(screen.getByTestId("error-alert")).toBeInTheDocument();
		act(() => {
			jest.runAllTimers();
		});
	});

	it("renders ACTION_ALERT without error", () => {
		render(<MemoryRouter><Provider store={store}>
			<ActionAlerts severity="error" errorDescription=""/>
		</Provider></MemoryRouter>);
		expect(screen.getByTestId("error-alert")).toBeInTheDocument();
	});
});