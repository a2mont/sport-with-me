import { StyleSheet} from 'react-native';

export const colors = {
  background: '#424242',
  selected: 'tomato',
  inactive: '#f5f5f5',
  buttonsBackground: '#212121'

}
export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#121212',
    },
    titleText:{
        fontSize:18,
        fontWeight: 'bold',
        
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
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
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
      },
});

