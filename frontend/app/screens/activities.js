
import React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, FlatList,} from 'react-native';
import {colors, globalStyles} from '../styles/global';
import ActivityItem from '../components/activityItem';
import SwitchSelector from 'react-native-switch-selector';
import Api from '../api/api';
import {Context as AuthContext} from '../context/authContext';
import CustomButton from '../components/customButton';


export default function Activities({navigation}) {
  const [activities,setActivities] = useState([]);
  const [refreshing, setRefereshing] = useState(false);
  const [showAll, setShowAll] = useState();
  const [sortMode, setSortMode] = useState(0);
  const [alphaState, setAlphaState] = useState('Alphabétiquement');
  const [dateState, setDateState] = useState('Par date');

  const {state,dispatch} = useContext(AuthContext);

  useEffect(() => {sortList(sortMode)}, [sortMode]);
  useEffect(() => {
    loadActivities().then(() => setSortMode(0));
  }
  ,[showAll]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => refreshHandler());
    return unsubscribe;
  }, [navigation]);
  const loadActivities = async () => {
    let toReturn = [];
    if(showAll == 0)
    toReturn = await Api.getUserActivities(state.id);
    else{
      let allActivities = await Api.getAllActivities();
      for(let i = 0; i < allActivities.length; i++ ){
        let act = allActivities[i];
        for(let j = 0; j < act.participants.length; j++){
          if(act.participants[j].id == state.id && act.creator.id != state.id){
            toReturn.push(act);
            break;
          }
        }
        
      }
    }
    setActivities(toReturn);
  }

  const pressHandler = (key) => {
    const activity = activities.filter(activity => activity.id == key);
    if(activity.length > 0)
      navigation.navigate('Details', {activity: activity[0]});
    else
      console.log('Could not find activity');
  };

  const refreshHandler = () => {
    setRefereshing(true);
    loadActivities().then(() => {sortList();setRefereshing(false)});
  }

  const handleShow = (value) => {
    setShowAll(value);
    refreshHandler();
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

  const sortList = (sortOrder) => {
    setActivities( (current) => {
      switch(sortOrder){
        case 0:
          setAlphaState("Alphabétiquement");
          setDateState('Par date');
          break;
        case 1:
          setAlphaState("Croissant");
          setDateState('Par date');
          current.sort((a,b) => { return compareItems(a.sport,b.sport) });
          break;
        case 2:
          setAlphaState("Décroissant");
          setDateState('Par date');
          current.sort((a,b) => { return compareItems(b.sport,a.sport) });
          break;
        case 3:
          setDateState("Plus proche");
          setAlphaState("Alphabétiquement");
          current.sort((a,b) => { return compareItems(a.date.day,b.date.day) });
          break;
        case 4:
          setDateState("Plus lointain");
          setAlphaState("Alphabétiquement");
          current.sort((a,b) => { return compareItems(b.date.day,a.date.day) });
          break;
      }
      
      return current;
    });
  }


  return (
    <View style={globalStyles.container}>
      <View style={{marginHorizontal:5, marginTop:15, marginBottom:10}}>
        <SwitchSelector 
          initial={showAll}
          onPress={value =>  {handleShow(value);}}
          value={showAll}
          options={[
            {label: 'Mes activités', value: 0},
            {label: 'Mes inscriptions', value: 1}
          ]}
          backgroundColor={colors.inactive}
          buttonColor={colors.selected}
          selectedColor={colors.textDark}
          fontSize={15}
        />
      </View>
        
        <View style={{marginVertical: 10,paddingBottom:50, flex:1}}>
          <FlatList 
            data={activities}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item}) => (
              <ActivityItem activity={item} pressHandler={pressHandler} />
            )}
            refreshing={refreshing}
            onRefresh={refreshHandler}
            ListEmptyComponent={<Text style={{marginVertical: 20, color: colors.textLight, alignSelf: 'center', fontSize:16}}>Aucune activité ici...</Text>}
          />
        </View>
        <View style={styles.filterView}>
        <CustomButton 
            title={alphaState}
            style={alphaState != 'Alphabétiquement' ? ({
              backgroundColor:colors.selected,
              borderColor:colors.textDark,
              borderTopLeftRadius:10, 
              borderTopRightRadius:0, 
              borderBottomLeftRadius:10,
              borderBottomRightRadius:0,
              borderRightWidth:0.5,
              flex:1,
              height:40,
              alignItems:'center',
              justifyContent:'center',
            }): ({
              
              backgroundColor:colors.inactive,
              borderColor:colors.textDark,
              borderTopLeftRadius:10, 
              borderTopRightRadius:0, 
              borderBottomLeftRadius:10,
              borderBottomRightRadius:0,
              borderRightWidth:0.5,
              flex:1,
              height:40,
              alignItems:'center',
              justifyContent:'center',
            })}
            onPress={() => {sortMode == 2 ? setSortMode(1) : setSortMode(2)}}
          />
          <CustomButton 
            title={dateState}
            style={dateState != 'Par date' ? ({
              backgroundColor:colors.selected,
              borderColor:colors.textDark,
              borderTopLeftRadius:0, 
              borderTopRightRadius:10, 
              borderBottomLeftRadius:0,
              borderBottomRightRadius:10,
              borderLeftWidth:0.5,
              flex:1,
              height:40,
              alignItems:'center',
              justifyContent:'center',
            }): ({
              backgroundColor:colors.inactive,
              borderColor:colors.textDark,
              borderTopLeftRadius:0, 
              borderTopRightRadius:10, 
              borderBottomLeftRadius:0,
              borderBottomRightRadius:10,
              borderLeftWidth:0.5,
              flex:1,
              height:40,
              alignItems:'center',
              justifyContent:'center',
            }) }
            onPress={() => {sortMode == 4 ? setSortMode(3) : setSortMode(4)}}
          />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  
  filterView:{
    flexDirection:'row',
    marginHorizontal:7,
    position:'absolute',
    bottom:'2%',
  },
  filterButton:{
    flex:1,
    height:40,
  },
});