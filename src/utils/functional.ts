import {favorites} from "./variables";
import {FindLocationModel} from "../models/api/findLocation";
import {DetailedLocationModel} from "../models/api/detailedLocation";

export function getLocalFav() {
    return localStorage.getItem(favorites);
}

export function setLocalFav(arr: number[]) {
    return localStorage.setItem(favorites, JSON.stringify(arr));
}

export function toTextualDescription(degree: number) {
    const sectors = ["Northerly", "North-Easterly", "Easterly", "South-Easterly", "Southerly", "South-Westerly", "Westerly", "North-Westerly"];
    degree += 22.5;
    (degree < 0) ? degree = 360 - Math.abs(degree) % 360 : degree = degree % 360;
    let which = parseInt(String(degree / 45));
    return sectors[which];
}

export function mapLocationToCityState(obj: FindLocationModel) {
    return {
        id: obj.id,
        name: obj.name,
        country: obj.sys.country,
        temp: obj.main.temp,
        weathIcon: obj.weather[0].icon,
        weathDescr: obj.weather[0].description,
        lat: obj.coord.lat,
        lon: obj.coord.lon
    };
}

export function mapDetailsToDetailedState(obj: DetailedLocationModel) {
    return {
        hourlyTemp: obj.hourly.slice(0, 12).map(({temp}: { temp: number }) => Math.round(temp)),
        details: {
            timezone: obj.timezone,
            uvi: obj.current.uvi,
            visibility: obj.current.visibility,
            windSpeed: obj.current.wind_speed,
            windDegree: obj.current.wind_deg,
            pressure: obj.current.pressure,
            tempFeels: obj.current.feels_like,
            sunrise: obj.current.sunrise,
            sunset: obj.current.sunset,
            humidity: obj.current.humidity
        }
    };
}