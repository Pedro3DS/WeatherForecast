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
        justifyContent:"center"
    },
    headerText:{
        color:"#ffffff",
        paddingVertical:10,
        paddingHorizontal:25,
        fontSize:25,
        fontWeight:"bold",
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
    },
    shadowProps:{
        shadowColor: '#000000',
        shadowOffset: {width: -4, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 100,
        backgroundColor:"white"
    }
  });
  