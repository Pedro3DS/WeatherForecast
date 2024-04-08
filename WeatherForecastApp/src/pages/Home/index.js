import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './homeStyle';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native';

import { getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../../api/weather';

export default function Home() {
  const [currentTemp, setCurrentTemp] = useState("0")
  const [currentTempMax, setCurrentTempMax] = useState("0")
  const [currentTempMin, setCurrentTempMin] = useState("0")
  const [currentWindSpeed, setCurrentWindSpeed] = useState("0")
  const [currentHumidity, setCurrentHumidity] = useState("0")
  const [currentTime, setCurrentTime] = useState("0")
  const days = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
  const currentDays = [];
  const currentDay = new Date().getUTCDay();

  for (let i = currentDay; i < days.length; i++) {
      currentDays.push(days[i]);
  }

  for (let i = 0; i < currentDay; i++) {
      currentDays.push(days[i]);
  }

  getDailyWeather( -54.590959024422375, -20.420257618066426, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {     
      setCurrentTempMax(Math.round(res['data']['daily']['temperature_2m_max'][0]))
      setCurrentTempMin(Math.round(res['data']['daily']['temperature_2m_min'][0]))
  })
  getCurrentWeather( -54.590959024422375, -20.420257618066426, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
      setCurrentTemp(Math.round(res['data']['current']['temperature_2m']))
      setCurrentWindSpeed(Math.round(res['data']['current']['wind_speed_10m']))
      setCurrentHumidity(res['data']['current']['relative_humidity_2m'])
      if(res['data']['current']['time'].slice(11,13) > 13){

        setCurrentTime(res['data']['current']['time'].slice(11,16) + " pm")
      }else{
        setCurrentTime(res['data']['current']['time'].slice(11,16) + " am")
      }
      
  })
  // getHourlyWeather( -54.590959024422375, -20.420257618066426, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
  //   res => {
  //     console.log(res)
  // })

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={35} style={homeStyles.backGround} source={require("../../assets/nightBg3.jpg")}/>
      <StatusBar />

      <ScrollView>
        <View placeholder='Location' style={homeStyles.locationView}>
          <FontAwesome name='search' style={homeStyles.locationSearch}/>
          <TextInput placeholder='Local' placeholderTextColor={'white'} style={homeStyles.locationInput} cursorColor={'rgba(255,255,255,0.2)'}/>
        </View>
        <View style={homeStyles.infosBg}>

          <View style={homeStyles.header}>
            <Text style={homeStyles.headerText}>Campo Grande, <Text style={homeStyles.headerCityText}>Cel. Antonino</Text></Text>
          </View>

          <View style={homeStyles.weatherContainer}>
            <View style={homeStyles.weatherRow}>
              <View style={homeStyles.cloud}>
                <MaterialCommunityIcons style={homeStyles.cloudIcon} name='weather-cloudy'/>
              </View>
              <View style={homeStyles.temp}>
                <Text style={homeStyles.tempText}>{currentTemp}°</Text>
              </View>
              
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
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='swap-vertical'/>
                  <Text style={homeStyles.weatherInfosText}>{currentTempMax}° - {currentTempMin}°</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={homeStyles.dailyInfosContainer}>
          <View style={homeStyles.dailyInfos}>
            <FlatList 
                  data={hourlyData}
                  renderItem={({item})=>
                    <View style={homeStyles.dayWeather}>
                      <MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/>
                      <Text style={homeStyles.daysTextWeather}>{item}</Text>
                    </View>}
                    scrollEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

          </View>

        </View> */}

        <View style={homeStyles.daysWeatherContainer}>
            <FlatList 
              data={currentDays}
              renderItem={({item})=>
                <View style={homeStyles.dayWeather}>
                  <MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/>
                  <Text style={homeStyles.daysTextWeather}>{item}</Text>
                </View>}
                scrollEnabled={false}
            />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

