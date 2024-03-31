import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    headerText:{
        color:"white",
        paddingTop:14,
        fontSize:25
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
        marginTop:25,
        justifyContent:"center"
    },
    cloudIcon:{
        color:"white",
        fontSize:150
    },
    temp:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    tempText:{
        color:"white",
        fontSize:50
    }
  });
  