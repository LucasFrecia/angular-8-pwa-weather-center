/**
 * Model File.
 *
 * Map full state model. { ForecastStateModel }
 *
 * Map objects to open weather current city status from API JSON response: { CityItemForecastModel }
 * (http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=106ca53e813644cab8c4fd0dfab38d42)
 *
 * Map Objects to city 5 day forecast:
 * (http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=106ca53e813644cab8c4fd0dfab38d42)
 *
 * Map Object to group of cities request:
 * (http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=106ca53e813644cab8c4fd0dfab38d42)
 *
 * Remove open weather's "Internal parameters" such as "base, sys.type, sys.id, and sys.message" since they wont be used for sure.
 *
 * How to get Icon URL in WeatherModel.icon :  http://openweathermap.org/img/wn/10d@2x.png
 *
 * @author Lucas Frecia <lucasfrecia@gmail.com>
 */

export interface ForecastStateModel {
    selectedCityForecast: FiveDayForecastModel;
    selectedCityCurrentWeather: CurrentWeatherCityItemModel;
    groupCityCurrentWeather: CityGroupCurrentWeatherModel;
    errors: any;
}

export interface CurrentWeatherCityItemModel {
    coord: LatLonModel;
    weather: WeatherModel;
    main: MainModel;
    visibility: number;
    wind: WindModel;
    clouds: CloudsModel;
    dt: number;
    sys: SysModel;
    timezone: number;
    id: number;
    name: string;
    dt_txt?: string; // Date:Time. Optional so that 5 day forecast list model (FiveDayForecastModel.list) can be a Partial<T>
}

export interface FiveDayForecastModel {
    cod: number;
    message: number;
    cnt: number;
    list: Partial<CurrentWeatherCityItemModel>[];
    city: {
        id: number;
        name: string;
        coord: LatLonModel;
        country: string;
    };
}

export interface CityGroupCurrentWeatherModel {
    cnt: number; // number of cities fetched
    list: Partial<CurrentWeatherCityItemModel>[];
}

export interface HttpOpenWeatherReqData {
    city: string;
    country: string;
}

interface LatLonModel {
    lat: number;
    lon: number;
}

interface WeatherModel {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainModel {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

interface WindModel {
    speed: number;
    deg: number;
}

interface CloudsModel {
    all: number;
}

interface SysModel {
    country: string;
    sunrise: number;
    sunset: number;
}
