import axios from "axios";

const apiKey = "4c8694a9460c6b2285498850ef6c022b";

export const instance = axios.create({
	baseURL: "https://api.openweathermap.org/data/2.5",
	params: {
		appid: apiKey,
		units: "metric"
	}
});