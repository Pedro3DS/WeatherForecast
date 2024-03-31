import axios from 'axios'
import { apiKey } from './constants';

const forecastEndPoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndPoint = params => `https://api.weatherapi.com/v1/search.json?key=66331fd493a74ca8b4f00354243103&q=${params.cityName}`;

const apiCall = async (endPoint) => {
    const options = {
        method: 'GET',
        url: endPoint
    };
    try{
        const result = await axios.request(options);
        return result;
    }catch(e){
        console.log(`Error => ${e}`);
        return null;
    };
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndPoint(params));
}
export const fetchLocations = params => {
    return apiCall(locationsEndPoint(params));
}