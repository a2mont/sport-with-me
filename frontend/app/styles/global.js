import { StyleSheet} from 'react-native';

export const colors = {
  background: '#121212',
  selected: '#e6e6e6',
  inactive: '#969696',
  buttonsBackground: '#212121',
  buttonsBackgroundLight: '#bdbdbd',
  textDark: '#000000',
  textLight: '#aeaeae',
  textHighlight: '#e6e6e6',
  inactiveButton: '#313131',
  error:'#c62828',

}
export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background,
    },
    baseText:{
      fontSize: 15,
      color: colors.textLight,
    },
    highlightedText:{
      fontSize: 15,
      color: colors.textHighlight,
    },
    titleText:{
      fontSize :26,
      fontWeight: 'bold',
      color: colors.textLight
    },
    textInput:{
      backgroundColor:colors.buttonsBackground,
      marginHorizontal:'10%',
      padding: 5,
      paddingHorizontal: 20,
      marginVertical:10,
      borderWidth:1.5,
      borderRadius: 20,
      borderColor: colors.textLight,
      flexDirection:'row'
    },
    textInputContent:{
      marginHorizontal:15,
      fontSize:15,
      color: colors.textLight,
    },
    headerIcon:{
        margin:10,
        fontSize:30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        height:40,
        margin:10,
      },
    modalView: {
      flex:1,
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalIcon:{
      alignItems: "flex-start",
    },
    modalContent:{
      flex:1,
    },
    errorText:{
      color: colors.error,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 6,
      marginHorizontal:30,
      fontSize:14,
      textAlign:'right'
    },
});

