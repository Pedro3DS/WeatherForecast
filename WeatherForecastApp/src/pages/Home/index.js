import { SafeAreaView, SafeAreaViewBase, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './homeStyle';
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native';


export default function Home() {
  const [location, setLocation] = useState("")

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image blurRadius={100} style={homeStyles.backGround} source={require("../../assets/bg.jpg")}/>
      <StatusBar/>
      <ScrollView>
        <View style={homeStyles.header}>
          <Text style={homeStyles.headerText}>Weather Forecast</Text>
        </View>
        <View placeholder='Location' style={homeStyles.locationView}>
          <FontAwesome name='search' style={homeStyles.locationSearch}/>
          <TextInput placeholder='Location' placeholderTextColor={'white'} style={homeStyles.locationInput} cursorColor={'rgba(255,255,255,0.2)'}/>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

