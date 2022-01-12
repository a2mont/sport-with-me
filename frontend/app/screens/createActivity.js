import React, {useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors, globalStyles } from '../styles/global.js';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

/*
const activitySchema = yup.object({
    
    sport: yup.string().required(),
    date: yup.object().shape({
        date: yup.date().min(new Date()).required(),
        hour: yup.date().required(),
    }),
    location: yup.object().shape({
        latitude: yup.string().required(),
        longitude: yup.string().required(),
    }),
    price: yup.number(),
    public: yup.boolean(),
    comments: yup.string(),

  });
*/
export default function ActivityForm({addActivity, activityLocation}){
    const sportsData = require('../assets/sports.json');
    const sportsList = sportsData.sports;
    const [date, setDate] = useState(new Date());
    const [showDate,setShowDate] = useState(false);
    const [showTime,setShowTime] = useState(false);
    const [fullday, setFullday] = useState(false);
    const [dateLabel,setDateLabel] = useState('');
    const [timeLabel, setTimeLabel] = useState('');
    const [price,setPrice] = useState('');
    const [correct, setCorrect] = useState(true);
    const [selectedSport, setSelectedSport] = useState('Sport')

    const dateChange = (date) => {
        setShowDate(false);
        if(date >= new Date())
            setDateLabel(date);
        else
            Alert.alert('Date erronée','Le jour est déjà passé');
    }
    const timeChange = (time) => {
        setShowTime(false);
        setTimeLabel(time);
    }

    return(
        
        <View style={globalStyles.container}>
            <Formik
                initialValues={{
                    sport:'',
                    date:{
                        day: '',
                        hour: '',
                    },
                    location:{
                        latitude: activityLocation.latitude, 
                        longitude: activityLocation.longitude,
                    },
                    price: 0.0,
                    public: true,
                    comments: "",
                    }}
                onSubmit={(values, action) => {
                    
                    try{ 
                        addActivity(values).then(() => {
                            action.resetForm();
                            setCorrect(true);
                        }).catch(() => setCorrect(false))
                    }catch (err){
                        
                    }
                }}
            >
                {props => (
                    <View style={globalStyles.container}>
                        <Text style={styles.title}>Créer une activité</Text>
                        <View style={globalStyles.textInput}>
                        <Ionicons 
                            name='search'
                            size={22}
                            color={colors.textLight}
                            style={{marginVertical:5}}
                        />
                        <SearchableDropdown
                                onTextChange={(text) => {}}
                                //On text change listner on the searchable input
                                onItemSelect={(item) => {
                                    props.values.sport=item.name;
                                    
                                    setSelectedSport(item.name);
                                }}
                                //onItemSelect called after the selection from the dropdown
                                containerStyle={{}}
                                //suggestion container style
                                textInputStyle={globalStyles.textInputContent}
                                itemStyle={{
                                    //single dropdown item style
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: colors.textLight,
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                }}
                                itemTextStyle={{
                                    //text style of a single dropdown item
                                    color: colors.textDark,
                                }}
                                itemsContainerStyle={{
                                    //items container style you can pass maxHeight
                                    //to restrict the items dropdown height
                                    maxHeight: '60%',
                                }}
                                items={sportsList}
                                //mapping of item array
                                defaultIndex={0}
                                //default selected item index
                                placeholder='Rechercher un sport'
                                placeholderTextColor={colors.textLight}
                                //place holder for the search input
                                resetValue={false}
                                //reset textInput Value with true and false state
                                underlineColorAndroid="transparent"
                                //To remove the underline from the android input
                            />
                    </View>
                        
                        <View>
                            <TouchableOpacity onPress={()=> setShowDate(true)}>
                                {dateLabel == '' && <Text>DATE</Text>}
                                {dateLabel != '' && <Text>{dateLabel}</Text>}
                            </TouchableOpacity>
                            <Button onPress={() => setFullday(!fullday)} title="Fullday"/>
                            {!fullday && <TouchableOpacity onPress={()=> setShowTime(true)}>
                                {timeLabel == '' && <Text>HOUR</Text>}
                                {timeLabel != '' && <Text>{timeLabel}</Text>}
                            </TouchableOpacity>}
                        </View>
                        <View>
                            <TextInput
                                value={price}
                                onChangeText={(val) => {
                                    props.values.price = val;
                                    setPrice(val);
                                }}
                                placeholder='Prix' 
                                keyboardType='numeric'/>
                        </View>
                        {/*<Text>Checkbox public/privé + infos sur signification</Text>
                        <View>
                                <TouchableOpacity onPress={() => {
                                    const value = !restricted;
                                    props.values.public = value;
                                    setRestricted(value);
                                    }}>
                                    <Text>Public ? : {restricted.toString()}</Text>
                                </TouchableOpacity>
                                </View>*/}
                        <View style={styles.form}>
                            <Text>Commentaires optionnels</Text>
                            <View style={styles.formline}>
                                <TextInput 
                                    style={globalStyles.input}
                                    placeholder='Commentaires'
                                    onChangeText={(val) => props.values.comments = val}
                                />
                            </View>
                            {showDate && (
                                <DateTimePicker
                                    value={date}
                                    mode='date'
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event,val) => {
                                        //var newDate = moment(val).format('YYYY-MM-DD');
                                        const value = moment(val).format('YYYY-MM-DD');
                                        dateChange(value);
                                        setDate(val);
                                        //console.log(moment(val).format('YYYY-MM-DD'))
                                        props.values.date.day = value;
                                        //console.log(props.values.date);
                                    }}
                                />)
                            }
                            {showTime && (
                                <DateTimePicker
                                    value={date}
                                    mode='time'
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={(event,val) => {
                                        //console.log(val);
                                        const value = moment(val).format('HH:mm');
                                        timeChange(value);
                                        setDate(val);
                                        props.values.date.hour = value;
                                        //console.log(props.values.time);
                                    }}
                                />)
                            }
                        </View>
                        {!correct && <Text style={globalStyles.errorText}>L'activité n'est pas correctment remplie</Text>}
                        <Button onPress={() => {props.handleSubmit();}} title='Submit'/>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        color: colors.textLight,
        alignSelf:'center',
        margin:20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    formsView:{
        flex:1,
        backgroundColor: colors.background,
    },
    form:{
    },
    formline:{
        alignItems:'flex-start',
        flexDirection:'row',
        alignItems:'center',
    },
})