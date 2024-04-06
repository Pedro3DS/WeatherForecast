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
  const [currentWindSpeed, setCurrentWindSpeed] = useState("0")
  const [currentHumidity, setCurrentHumidity] = useState("0")
  const [currentTime, setCurrentTime] = useState("0")
  const days = [{id:"0",day:"Domingo"}, {id:"1",day:"Segunda-Feira"},{id:"2",day:"Terça-Feira"},{id:"3",day:"Quarta-Feira"},{id:"4",day:"Quinta-Feira"},{id:"5",day:"Sexta-Feira"}, {id:"6",day:"Sabado"}]
  
  
  const handleText = text =>{
    if(text.length > 2){
      fetchLocations({cityName: text}).then(data=>{
        setLocation(data)
      })
      
    }
  }
  const handleDebouceText = useCallback(debounce(handleText, 1200), []);
  getDailyWeather( -54.622265, -20.469265, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
      // setCurrentTemp(res['current']['currentTemp'])
      // setCurrentWindSpeed(res['current']['windSpeed'])
     
      // console.log(res['data']['daily'])
    })
    const currentDay = new Date().getUTCDay()
    console.log(currentDay)


  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={35} style={homeStyles.backGround} source={require("../../assets/nightBg.jpg")}/>
      <StatusBar />

      <ScrollView>
        <View placeholder='Location' style={homeStyles.locationView}>
          <FontAwesome name='search' style={homeStyles.locationSearch}/>
          <TextInput placeholder='Location' placeholderTextColor={'white'} style={homeStyles.locationInput} cursorColor={'rgba(255,255,255,0.2)'} onChangeText={handleDebouceText}/>
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
              <View style={homeStyles.minMaxWeather}><Text style={homeStyles.minMaxWeatherText}>35°-25°</Text></View>
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
            data={days}
            renderItem={({item})=>
              <View style={homeStyles.dayWeather}>
                <MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/>
                <Text style={homeStyles.daysTextWeather}>{item.day} Sol</Text>
              </View>}
          />
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

