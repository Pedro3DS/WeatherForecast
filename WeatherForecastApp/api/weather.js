import axios from 'axios'

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
    return axios.get("https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,shortwave_radiation_sum,et0_fao_evapotranspiration", {
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
    return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m", {
        params:{
            latitude: lat,
            longitude: lon,
            timezone,
        }
    }).then(({data}) => {
        return{ data }
    })

}

