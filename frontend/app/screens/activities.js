
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {globalStyles} from '../styles/global';
import ActivityItem from '../components/activityItem';
import FloatingButton from '../components/floatButton';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../api/api';

export default function Activities({navigation}) {
  const [activities,setActivities] = useState([
    //{sport: 'basketball', date: '2021-06-14', key:'1'},
    //{sport: 'football', date: '2021-05-12', key:'2'},
    //{sport: 'tennis', date: '2021-08-03', key:'3'},
    //{sport: 'bilboquet', date: '2021-14-10', key:'4'},
  ]);

  const [refreshing, setRefereshing] = useState(false);

  const [direction, setDirection] = useState(null);

  const loadActivities = async () => {
    const allActivities = await Api.getAllActivities();
    setActivities(allActivities);
    //console.log(activities[0].sport);
  }

  useEffect(() => {
    loadActivities()
  }, []);

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
          current.sort((a,b) => { return compareItems(a.date,b.date) });
          break;
        case 'oton':
          current.sort((a,b) => { return compareItems(b.date,a.date) });
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
        <FloatingButton/>
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