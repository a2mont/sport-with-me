
import React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button} from 'react-native';
import {globalStyles} from '../styles/global';
import ActivityItem from '../components/activityItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../api/api';
import {Context as AuthContext} from '../context/authContext';

export default function Activities({navigation}) {
  const [activities,setActivities] = useState([]);
  const [refreshing, setRefereshing] = useState(false);
  const [direction, setDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const {state,dispatch} = useContext(AuthContext);

  const loadActivities = async () => {
    let allActivities;
    if(!showAll)
      allActivities = await Api.getUserActivities(state.id);
    else
      allActivities = await Api.getAllActivities();
    setActivities(allActivities);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadActivities();
    });
    return unsubscribe;
  },[navigation]);

  const pressHandler = (key) => {
    const activity = activities.filter(activity => activity.id == key);
    //console.log(activity);
    if(activity.length > 0)
      navigation.navigate('Details', {activity: activity[0]});
    else
      console.log('Could not find activity')
  };

  const refreshHandler = () => {
    setRefereshing(true);
    loadActivities().then(setRefereshing(false));
  }

  const compareItems = (a,b) => {
    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }

  const sortList = (value) => {
    setActivities( (current) => {
      setDirection(value);
      switch(value){
        case 'stob':
          current.sort((a,b) => { return compareItems(a.sport,b.sport) });
          break;
        case 'btos':
          current.sort((a,b) => { return compareItems(b.sport,a.sport) });
          break;
        case 'ntoo':
          current.sort((a,b) => { return compareItems(a.date.day,b.date.day) });
          break;
        case 'oton':
          current.sort((a,b) => { return compareItems(b.date.day,a.date.day) });
          break;
      }
      return current;
    });
  }

  return (
    <View style={globalStyles.container}>
        <View style={styles.filterView}>
          <DropDownPicker 
            items={[
              {label: 'Croissant', value:'stob'},
              {label: 'Decroissant', value:'btos'}
            ]}
            defaultValue= {null}
            placeholder="Alphabetiquement"
            containerStyle={styles.filterButton}
            onChangeItem={item => sortList(item.value)}
          />
          <DropDownPicker 
            items={[
              {label: 'Plus Recent', value:'ntoo'},
              {label: 'Plus Ancien', value:'oton'}
            ]}
            defaultValue= {null}
            placeholder="Par date"
            containerStyle={styles.filterButton}
            onChangeItem={item => sortList(item.value)}
          />
        </View>
        <View style={{paddingBottom:50}}>
          <FlatList 
            data={activities}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item}) => (
              <ActivityItem activity={item} pressHandler={pressHandler} />
            )}
            extraData={direction}
            refreshing={refreshing}
            onRefresh={refreshHandler}
          />
        </View>
        <Button onPress={() => {setShowAll(!showAll); loadActivities();}} title='test'/>
    </View>
  );
}


const styles = StyleSheet.create({
  filterView:{
    flexDirection:'row',
  },
  filterButton:{
    flex:1,
    height:40,
  },
});