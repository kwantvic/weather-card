export interface DetailedLocationModel {
    hourly: DetailedHourlyModel[],
    timezone: string,
    current: DetailedCurrentModel

}

interface DetailedHourlyModel {
    temp: number
}

interface DetailedCurrentModel {
    uvi: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    feels_like: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    humidity: number
}

