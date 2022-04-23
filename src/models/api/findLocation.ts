export interface ListLocationModel {
    list: FindLocationModel[]
}

export interface FindLocationModel {
    id: number,
    name: string,
    sys: FindLocationSysModel,
    main: FindLocationMainModel,
    weather: FindLocationWeatherModel[],
    coord: FindLocationCoordModel
}

interface FindLocationSysModel {
    country: string
}

interface FindLocationMainModel {
    temp: number
}

interface FindLocationWeatherModel {
    icon: string,
    description: string
}

interface FindLocationCoordModel {
    lat: number,
    lon: number
}

