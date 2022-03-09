import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {globalStyles, colors} from '../styles/global';

export default function About() {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.group}>
          <Text style={globalStyles.titleText}>Créer une activité</Text>
          <Text style={globalStyles.baseText}><Text style={styles.index}>1.</Text>Choisir un endroit sur la carte</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/choose.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>2.</Text>Compléter les informations de l'activité</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/create.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>3.</Text>Gérer ses activités</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/manage_create.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>4.</Text>Voir les détails d'une activité</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/details_create.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>5.</Text>Gérer la liste des participants</Text>
          <Image style={[styles.image, styles.horizontalImage]} source={require('../assets/App_screens/list_create.png')}/>
          
        </View>
        <View style={styles.group}>
          <Text style={globalStyles.titleText}>S'inscrire à une activité</Text>
          <Text style={globalStyles.baseText}><Text style={styles.index}>1.</Text>Choisir une activité</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/choose_reg.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>2.</Text>S'inscrire</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/register.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>3.</Text>Gérer ses activités</Text>
          <Image style={[styles.image, styles.verticalImage]} source={require('../assets/App_screens/manage_reg.png')}/>
          <Text style={globalStyles.baseText}><Text style={styles.index}>4.</Text>Voir la liste des participants</Text>
          <Image style={[styles.image, styles.horizontalImage]} source={require('../assets/App_screens/list_reg.png')}/>
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  group:{
    alignItems:'flex-start',
    padding:5,
    margin:10,
  },
  image: {
    alignSelf:'center',
    borderColor: colors.buttonsBackgroundLight, 
    borderWidth:2, 
    borderRadius:10,
    marginVertical: 10,
    resizeMode:'cover'
  },
  index:{
    fontWeight:'bold',
  },
  verticalImage:{
    height:250, 
    width: 175
  },
  horizontalImage:{
    height:150, 
    width: 300,
  },
})