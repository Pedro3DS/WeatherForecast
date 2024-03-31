import { SafeAreaView, SafeAreaViewBase, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './homeStyle';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native';


export default function Home() {
  const [location, setLocation] = useState("")

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={100} style={homeStyles.backGround} source={require("../../assets/Frame 7bg.jpg")}/>
      <StatusBar />
      <ScrollView>
        <View placeholder='Location' style={homeStyles.locationView}>
          <FontAwesome name='search' style={homeStyles.locationSearch}/>
          <TextInput placeholder='Location' placeholderTextColor={'white'} style={homeStyles.locationInput} cursorColor={'rgba(255,255,255,0.2)'}/>
        </View>
        <View style={homeStyles.header}>
          <Text style={homeStyles.headerText}>Londom</Text>
        </View>
        <View style={homeStyles.cloud}>
          <MaterialCommunityIcons style={homeStyles.cloudIcon} name='weather-cloudy'/>
        </View>
        <View style={homeStyles.temp}>
          <Text style={homeStyles.tempText}>25°</Text>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

