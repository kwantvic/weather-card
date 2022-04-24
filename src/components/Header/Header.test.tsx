import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import { MemoryRouter } from "react-router-dom";

import store from "../../redux";
import {Header} from "./index";

describe("HEADER", () => {
    it("renders HEADER", () => {
        render(<MemoryRouter><Provider store={store}><Header/></Provider></MemoryRouter>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders search input without value", () => {
        render(<MemoryRouter><Provider store={store}><Header/></Provider></MemoryRouter>);
        expect(screen.getByPlaceholderText(/Weather in your city/i)).toBeInTheDocument();
    });

    it("input event", () => {
        render(<MemoryRouter><Provider store={store}><Header/></Provider></MemoryRouter>);
        const input = screen.getByRole("textbox")  as HTMLInputElement;
        userEvent.type(input, "london");
        expect(input.value).toBe("london");
        input.onchange = ev => mockChange(ev);
        const mockChange = jest.fn(ev => {
            jest.fn(ev.target.value);
        });
    });

    it("onClick to find", () => {
        render(<MemoryRouter><Provider store={store}><Header/></Provider></MemoryRouter>);
        const input = screen.getByRole("textbox")  as HTMLInputElement;
        userEvent.type(input, "london");
        const btn = screen.getByRole("button");
        userEvent.click(btn);
    })
})
