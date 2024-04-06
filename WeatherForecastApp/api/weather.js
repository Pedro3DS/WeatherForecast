import axios from 'axios'

export function getWeather(lon, lat, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m&hourly=relative_humidity_2m,temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=inch&timeformat=unixtime", {
        params:{
            latitude: lat,
            longitude: lon,
            timezone,
        }
    }).then(({data}) => {
        return{
            data
            // current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data)
        }
    })

}

export function getCurrentWeather(lon, lat, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m", {
        params:{
            latitude: lat,
            longitude: lon,
            timezone,
        }
    }).then(({data}) => {
        return{ data }
    })

}

export function getDailyWeather(lon, lat, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration", {
        params:{
            latitude: lat,
            longitude: lon,
            timezone,
        }
    }).then(({data}) => {
        return{ data }
    })

}

export function getHourlyWeather(lon, lat, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m", {
        params:{
            latitude: lat,
            longitude: lon,
            timezone,
        }
    }).then(({data}) => {
        return{ data }
    })

}

function parseCurrentWeather({current_weather, daily}){
    const { 
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
    } = current_weather
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],

    } = daily
    return{
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}
function parseDailyWeather({daily}){
    return daily.time.map((time, index) => {
        return{
            timeStamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}

function parseHourlyWeather({hourly, current_weather}){
    return hourly.time.map((time, index) => {
        return{
            timeStamp: time * 1000,
            iconCode: hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 10,

        }
    }).filter(({ timeStamp }) => timeStamp >= current_weather.time * 100)
}