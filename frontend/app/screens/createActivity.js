import React, {useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


export default function ActivityForm({addActivity, activityLocation}){
    const sportsData = require('../assets/sports.json');
    const sportsList = sportsData.sports;
    const activitySchema = yup.object({
        sport: yup.string().required(),
        date: yup.date().required(),
        time: yup.date(),
        latitude: yup.number().required(),
        longitude: yup.number().required(),
    });
    const [date, setDate] = useState(new Date());
    const [showDate,setShowDate] = useState(false);
    const [showTime,setShowTime] = useState(false);
    const [fullday, setFullday] = useState(false);
    const [dateLabel,setDateLabel] = useState('');
    const [timeLabel, setTimeLabel] = useState('');
    const [price,setPrice] = useState('');
    const [restricted, setRestricted] = useState(true);
    const [selectedSport, setSelectedSport] = useState('Sport')

    const dateChange = (date) => {
        setShowDate(false);
        setDateLabel(date);
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
                //validationSchema={activitySchema}
                onSubmit={(values, action) => {
                    action.resetForm();
                    addActivity(values);
                }}
            >
                {props => (
                    <View style={styles.formsView}>
                        <Text style={styles.title}>CREATE AN ACTIVITY</Text>
                        <SearchableDropdown
                                onTextChange={props.handleChange('rating')}
                                //On text change listner on the searchable input
                                onItemSelect={(item) => {
                                    props.values.sport=item;
                                    
                                    //setSelectedSport(item);
                                }}
                                //onItemSelect called after the selection from the dropdown
                                containerStyle={{ padding: 5 }}
                                //suggestion container style
                                textInputStyle={{
                                    //inserted text style
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    backgroundColor: '#FAF7F6',
                                }}
                                itemStyle={{
                                    //single dropdown item style
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#FAF9F8',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                }}
                                itemTextStyle={{
                                    //text style of a single dropdown item
                                    color: '#222',
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
                                placeholder='Sport'
                                //place holder for the search input
                                resetValue={false}
                                //reset textInput Value with true and false state
                                underlineColorAndroid="transparent"
                                //To remove the underline from the android input
                            />
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
                        <Text>Checkbox public/privé + infos sur signification</Text>
                        <View>
                                <TouchableOpacity onPress={() => {
                                    const value = !restricted;
                                    props.values.public = value;
                                    setRestricted(value);
                                    }}>
                                    <Text>Public ? : {restricted.toString()}</Text>
                                </TouchableOpacity>
                        </View>
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
                        <Button onPress={() => {props.handleSubmit();}} title='Submit'/>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        alignItems:'flex-start',
        marginBottom: 20,
        fontSize: 20,
    },
    formsView:{
        flex:1,
    },
    form:{
    },
    formline:{
        alignItems:'flex-start',
        flexDirection:'row',
        alignItems:'center',
    },
})