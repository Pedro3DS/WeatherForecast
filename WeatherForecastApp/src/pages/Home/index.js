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

import { getWeather } from '../../../api/weather';

export default function Home() {
  const [location, setLocation] = useState([]);
  const [currentTemp, setCurrentTemp] = useState("0")
  const [currentWindSpeed, setCurrentWindSpeed] = useState("0")
  
  
  const handleText = text =>{
    if(text.length > 2){
      fetchLocations({cityName: text}).then(data=>{
        setLocation(data)
      })
      
    }
  }
  const handleDebouceText = useCallback(debounce(handleText, 1200), []);
  getWeather( -54.6478, -20.4435, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
      setCurrentTemp(Math.round((res['current']['highTemp']-32)*(5/9)))
      setCurrentWindSpeed(Math.round(res['current']['windSpeed']* 1.609344))
      console.log(res)
    })

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={15} style={homeStyles.backGround} source={require("../../assets/nightBg2.jpg")}/>
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
            </View>
            
            <View>

              <View style={homeStyles.weatherInfos}>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='weather-windy'/>
                  <Text style={homeStyles.weatherInfosText}>{currentWindSpeed} km</Text>
                </View>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='water'/>
                  <Text style={homeStyles.weatherInfosText}>23%</Text>
                </View>
                <View style={homeStyles.weatherInfosRow}>
                  <MaterialCommunityIcons style={homeStyles.weatherInfosIcon} name='clock'/>
                  <Text style={homeStyles.weatherInfosText}>{currentHour}:{currentMinute} am</Text>
                </View>
              </View>
            </View>
          </View>
          
        </View>
        <View style={homeStyles.daysWeatherContainer}>

          <View style={homeStyles.daysWeather}>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Segunda-Feira, Sol</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-lightning'/><Text style={homeStyles.daysTextWeather}>Terça-Feira, Repangelejo</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Quarta-Feira, Sol</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Quinta-Feira, Sol</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Sexta-Feira, Sol</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Sabado, Sol</Text></View>
            <View style={homeStyles.dayWeather}><MaterialCommunityIcons style={homeStyles.daysIconWeather} name='weather-sunny'/><Text style={homeStyles.daysTextWeather}>Domingo, Sol</Text></View>
          </View>
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

