import { FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './homeStyle';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo"
import { useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { fetchLocations, fetchWeatherForecast } from '../../../api/weather';
import { debounce } from 'lodash'

import { getWeather, getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../../api/weather';

export default function Home() {
  const [location, setLocation] = useState([]);
  const [currentTemp, setCurrentTemp] = useState("0")
  const [currentTempMax, setCurrentTempMax] = useState("0")
  const [currentTempMin, setCurrentTempMin] = useState("0")
  const [currentWindSpeed, setCurrentWindSpeed] = useState("0")
  const [currentHumidity, setCurrentHumidity] = useState("0")
  const [currentTime, setCurrentTime] = useState("0")
  const days = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"]
  const currentDays = []
  const currentDaysTemperature = []

  getDailyWeather( -54.5892082705617, -20.420219415507272, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {     
      setCurrentTempMax(res['data']['daily']['temperature_2m_max'][0])
      setCurrentTempMin(res['data']['daily']['temperature_2m_min'][0])
  })
  getCurrentWeather( -54.5892082705617, -20.420219415507272, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
      setCurrentTemp(res['data']['current']['temperature_2m'])
      setCurrentWindSpeed(res['data']['current']['wind_speed_10m'])
      setCurrentHumidity(res['data']['current']['relative_humidity_2m'])
  })
  const currentDay = new Date().getUTCDay()
  for(var i = currentDay-1; i>=0; i--){
    currentDays.push(days[i])
  }
  currentDays.reverse()
  currentDays.unshift(days[currentDay])

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={35} style={homeStyles.backGround} source={require("../../assets/nightBg.jpg")}/>
      <StatusBar />

      <ScrollView>
        <View placeholder='Location' style={homeStyles.locationView}>
          <FontAwesome name='search' style={homeStyles.locationSearch}/>
          <TextInput placeholder='Location' placeholderTextColor={'white'} style={homeStyles.locationInput} cursorColor={'rgba(255,255,255,0.2)'}/>
        </View>
        <View>{location.map((loc, index)=>{
          let showBorder = index +1 != location.length;
          let borderClass = showBorder? 'border-b-2 border-b-gray-400':'';
          return(
            <TouchableOpacity onPress={handleText(loc)}
              key={index}>
              <Text> {loc?.country}</Text>

            </TouchableOpacity>
          )
        })}</View>
        <View style={homeStyles.infosBg}>

          <View style={homeStyles.header}>
            <Text style={homeStyles.headerText}>Brazil, <Text style={homeStyles.headerCityText}>MS/Campo Grande</Text></Text>
          </View>

          <View style={homeStyles.weatherContainer}>
            <View style={homeStyles.weatherRow}>
              <View style={homeStyles.cloud}>
                <MaterialCommunityIcons style={homeStyles.cloudIcon} name='weather-cloudy'/>
              </View>
              <View style={homeStyles.temp}>
                <Text style={homeStyles.tempText}>{currentTemp}°</Text>
              </View>
              <View style={homeStyles.minMaxWeather}><Text style={homeStyles.minMaxWeatherText}>{currentTempMax}° - {currentTempMin}°</Text></View>
            </View>
            
            <View>

              <View style={homeStyles.weatherInfos}>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='weather-windy'/>
                  <Text style={homeStyles.weatherInfosText}>{currentWindSpeed} km</Text>
                </View>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='water'/>
                  <Text style={homeStyles.weatherInfosText}>{currentHumidity}%</Text>
                </View>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='clock'/>
                  <Text style={homeStyles.weatherInfosText}>{currentTime}</Text>
                </View>
              </View>
            </View>
          </View>
          
        </View>
        <View style={homeStyles.daysWeatherContainer}>
          <FlatList 
            data={currentDays}
            renderItem={({item})=>
              <View style={homeStyles.dayWeather}>
                <MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/>
                <Text style={homeStyles.daysTextWeather}>{item} Sol</Text>
              </View>}
              
              scrollEnabled={false}
          />
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

