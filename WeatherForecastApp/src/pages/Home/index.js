import { FlatList, SafeAreaView, SafeAreaViewBase, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './homeStyle';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { fetchLocations, fetchWeatherForecast } from '../../../api/weather';
import { debounce } from 'lodash'


export default function Home() {
  const [location, setLocation] = useState([]);

  
  const handleText = text =>{
    if(text.length > 2){
      fetchLocations({cityName: text}).then(data=>{
        setLocation(data)
      })
      
    }
  }
  const handleDebouceText = useCallback(debounce(handleText, 1200), [])

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={15} style={homeStyles.backGround} source={require("../../assets/bgSky.jpg")}/>
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
            <Text style={homeStyles.headerText}>Londom</Text>
          </View>
          <View style={homeStyles.cloud}>
            <MaterialCommunityIcons style={homeStyles.cloudIcon} name='weather-cloudy'/>
          </View>
          <View style={homeStyles.temp}>
            <Text style={homeStyles.tempText}>25°</Text>
          </View>
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

