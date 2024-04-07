import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    infosBg:{
        backgroundColor:"rgba(0,0,0,0.2)",
        marginHorizontal:14,
        marginTop:20,
        borderRadius:10
    },
    container: {
        flex:1,
    },
    header:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    headerText:{
        color:"#ffffff",
        paddingVertical:10,
        paddingHorizontal:25,
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center"
    },
    headerCityText:{
        fontWeight:"normal",
        fontSize:20
    },
    locationView:{
        backgroundColor:"rgba(0,0,0,0.2)",
        marginHorizontal:14,
        marginVertical:14,
        borderRadius:8,
        padding:10,
        flex:1,
        flexDirection:"row",
        alignItems:"center"
    },
    locationInput:{
        marginHorizontal: 14,
        color:"white",
        width:"90%"
    },
    locationSearch:{
        color:"white",
    },
    backGround:{
        position:"absolute",
        width:"100%",
        height:"100%"
    },
    cloud:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    cloudIcon:{
        color:"white",
        fontSize:150,
        textAlign:"center",
        textAlignVertical:"center",
    },
    temp:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    tempText:{
        color:"white",
        fontSize:50,
        textAlign:"center"
    },
    weatherContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginVertical:20,
        marginHorizontal:35
    },
    weatherInfos:{
        flex:1,
        alignItems:"flex-start",
        justifyContent:"center",
    },
    weatherInfosRow:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
    },
    weatherInfosText:{
        color:"#ffffff",
        fontSize:20,
    },
    weatherInfosIcon:{
        fontSize:30,
        color:"#ffffff"
    },
    daysWeatherContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:50,
        width:"100%"
    },
    daysWeather:{
        width:"100%",
        borderRadius:10,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    dayWeather:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        borderRadius:10,
        marginVertical:10,
        backgroundColor:"rgba(0,0,0,0.2)",
    },
    daysIconWeather:{
        fontSize:25,
        color:"#ffffff",
        marginStart:15
    },
    daysTextWeather:{
        fontSize:20,
        color:"#ffffff",
        padding:10
    },

  });
  