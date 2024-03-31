import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:"#748E63",
        flex:1,
        alignItems:"center",
    },
    headerText:{
        color:"white",
        padding:10,
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
    }
  });
  