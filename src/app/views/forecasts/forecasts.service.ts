import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    tap,
    catchError
} from 'rxjs/operators';
import { environment } from 'environments/environment';
import {
    CurrentWeatherCityItemModel,
    FiveDayForecastModel,
    CityGroupCurrentWeatherModel
} from './forecasts-store/forecasts.model';

@Injectable({
    providedIn: 'root'
})
export class ForecastsService {

    private config = environment.weatherApi;

    constructor(private http: HttpClient) { }

    /**
     * getForecast Send GET request for city forecast
     * @param q string - city name and country code divided by comma, use ISO 3166 country codes
     */
    public getForecast(
        id: number
    ): Observable<FiveDayForecastModel> {
        let url;

        const qs: string[] = ['?'];

        /** Add url expected params
         *  q city name and country code divided by comma, use ISO 3166 country codes
         */
        qs.push(`id=${id}`);

        /** Add open weather api key */
        qs.push(`appid=${this.config.apiKey}`);

        /** Ask in celcius */
        qs.push(`units=metric`);

        /** Arm url string */
        url = `${this.config.baseUrl}${this.config.resources.fiveDayForecast}${qs.join('&')}`;

        return this.http.get<FiveDayForecastModel>(url).pipe(
            tap(data => console.log(`${ForecastsService.name}::getForecast (tap)\n\tdata: %o`, data)),
            catchError(this.handleError)
        );
    }

    /**
     * getCityCurrentWeather Send GET request for city current weather data
     * @param q string - city name and country code divided by comma, use ISO 3166 country codes
     */

    public getCityCurrentWeather(
        id: number
    ): Observable<CurrentWeatherCityItemModel> {
        let url;

        const qs: string[] = ['?'];

        /** Add url expected params */
        qs.push(`id=${id}`);

        /** Add open weather api key */
        qs.push(`appid=${this.config.apiKey}`);

        /** Ask in celcius */
        qs.push(`units=metric`);

        url = `${this.config.baseUrl}${this.config.resources.currentWeatherSingleCity}${qs.join('&')}`;

        return this.http.get<CurrentWeatherCityItemModel>(url).pipe(
            tap(data => console.log(`${ForecastsService.name}::getCityCurrentWeather (tap)\n\tdata: %o`, data)),
            catchError(this.handleError));
    }

    /**
     * getMultipleCityCurrentWeather Send GET request for group of cities current weather data
     * @param id string - city codes separated by comma
     */

    public getMultipleCityCurrentWeather(
        id: string
    ): Observable<CityGroupCurrentWeatherModel> {
        let url;

        const qs: string[] = ['?'];

        /** Add url expected params */
        qs.push(`id=${id}`);

        /** Add open weather api key */
        qs.push(`appid=${this.config.apiKey}`);

        /** Ask in celcius */
        qs.push(`units=metric`);

        url = `${this.config.baseUrl}${this.config.resources.currentWeatherGroup}${qs.join('&')}`;

        return this.http.get<CityGroupCurrentWeatherModel>(url).pipe(
            tap(data => console.log(`${ForecastsService.name}::getCityCurrentWeather (tap)\n\tdata: %o`, data)),
            catchError(this.handleError));
    }

    private handleError(error: any): Observable<never> {
        console.error(`${ForecastsService.name}::handledError\n\tdata: %o`, error);
        return throwError(error);
    }
}
