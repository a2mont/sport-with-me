import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { colors, globalStyles } from '../styles/global.js';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { Formik } from 'formik';
import CustomButton from '../components/customButton.js';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

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
    const [selectedSport, setSelectedSport] = useState('Cherchez un sport');
    

    const dateChange = (date) => {
        setShowDate(false);
        var com = new Date();
        var today = moment(com).format('YYYY-MM-DD');
        if(date >= today)
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
                        <View >
                            <Text style={styles.title}>Créer une activité</Text>
                        </View>
                        <View style={{marginVertical:20}}>
                            <View style={globalStyles.textInput}>
                            <Ionicons 
                                name='search'
                                size={20}
                                color={colors.textLight}
                                style={{marginVertical:5}}
                            />
                            <SafeAreaView>
                                <SearchableDropdown
                                    nestedScrollEnabled 
                                    onTextChange={(text) => {}}
                                    onItemSelect={(item) => {
                                        props.values.sport=item.name;
                                        setSelectedSport(item.name);
                                    }}
                                    containerStyle={{}}
                                    textInputStyle={globalStyles.textInputContent}
                                    itemStyle={{
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: colors.textLight,
                                    }}
                                    itemTextStyle={{
                                        color: colors.textDark,
                                    }}
                                    itemsContainerStyle={{
                                        maxHeight: '80%',
                                        
                                    }}
                                    items={sportsList}
                                    defaultIndex={0}
                                    placeholderTextColor={colors.textLight}
                                    placeholder={selectedSport}
                                    resetValue={false}
                                    underlineColorAndroid="transparent"
                                    listProps={{
                                        maxToRenderPerBatch:10,
                                        initialNumToRender:10}}
                                />
                            </SafeAreaView>
                        </View>
                        <ScrollView style={{paddingBottom:150}}> 
                            <View style={[globalStyles.textInput,{flexDirection:'column', justifyContent:'flex-start', marginVertical:20}]}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', alignContent:'space-between'}}>
                                    <TouchableOpacity style={styles.dateOpacity} onPress={()=> setShowDate(true)}>
                                        {dateLabel == '' && <Text style={styles.menuText}>Date</Text>}
                                        {dateLabel != '' && <Text style={styles.menuText}>{dateLabel}</Text>}
                                        <Fontisto 
                                            name='date'
                                            size={18}
                                            color={colors.textLight}
                                            style={styles.menuIcon}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.dateOpacity}>
                                        <Text style={styles.menuText}>Jour entier ?</Text>
                                        <BouncyCheckbox
                                            size={menuIconSize}
                                            fillColor={colors.textLight}
                                            unfillColor={colors.textHighlight}
                                            iconStyle={{ borderColor: colors.textHighlight, borderRadius: 6, marginLeft:10}}
                                            textStyle={{  }}
                                            onPress={(isChecked) => setFullday(isChecked)}
                                        />
                                    </View>
                                    
                                </View>
                                
                                {!fullday && <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> setShowTime(true)}>
                                    {timeLabel == '' && <Text style={styles.menuText}>Heure</Text>}
                                    {timeLabel != '' && <Text style={styles.menuText}>{timeLabel}</Text>}
                                    <Ionicons 
                                        name='time-outline'
                                        size={menuIconSize}
                                        color={colors.textLight}
                                        style={styles.menuIcon}
                                    />
                                </TouchableOpacity>}
                            </View>
                            <View style={[globalStyles.textInput, {paddingHorizontal: 0,paddingLeft: 5, width:80, alignSelf:'flex-end'}]}>
                                <TextInput
                                    value={price}
                                    onChangeText={(val) => {
                                        props.values.price = val;
                                        setPrice(val);
                                    }}
                                    onEndEditing={() =>{ 
                                        if (price.localeCompare('') != 0 && price.localeCompare('.-') != 0) {
                                            setPrice(`${price}.-`);
                                        }
                                    }}
                                    onFocus={() => {
                                        if(price.length > 1)
                                            setPrice(price.slice(0, price.length - 2));
                                    }}
                                    placeholder='Prix'
                                    placeholderTextColor={colors.textLight}
                                    keyboardType='numeric'
                                    style={[globalStyles.textInputContent, {marginLeft:10,}]}
                                />
                            </View>
                            <View style={{marginVertical:20}}>
                                <View style={globalStyles.textInput}>
                                    <TextInput 
                                        style={globalStyles.textInputContent}
                                        placeholder='Commentaires optionnels'
                                        placeholderTextColor={colors.textLight}
                                        onChangeText={(val) => props.values.comments = val}
                                    />
                                </View>
                            </View>
                            
                            {!correct && <Text style={[globalStyles.errorText, {alignSelf:'center'}]}>L'activité n'est pas correctement remplie</Text>}
                            <View style={{marginVertical:20}}>
                                <CustomButton onPress={() => {props.handleSubmit();}} title="C'est parti !"/>
                            </View>
                        </ScrollView>
                        
                        <DateTimePicker
                            value={date}
                            mode='date'
                            isVisible={showDate}
                            onConfirm={val => {
                                const value = moment(val).format('YYYY-MM-DD');
                                dateChange(value);
                                setDate(val);
                                props.values.date.day = value;
                            }}
                            onCancel={() => {setDateLabel(''); setShowDate(false);}}
                        />
                        <DateTimePicker
                            value={date}
                            mode='time'
                            is24Hour={true}
                            isVisible={showTime}
                            onConfirm={val => {
                                const value = moment(val).format('HH:mm');
                                timeChange(value);
                                setDate(val);
                                props.values.date.hour = value;
                            }}
                            onCancel={() => {setTimeLabel(''); setShowTime(false);}}
                        />
                        
                    </View>
                </View>
                )}
            </Formik>
        </View>
    );
}
const menuIconSize = 18;
const styles = StyleSheet.create({
    title:{
        color: colors.textLight,
        alignSelf:'center',
        margin:20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuText:{
        color:colors.textLight, 
        fontSize:16,
        marginVertical:5
    },
    menuIcon:{
        marginHorizontal:10, 
        marginVertical:8
    },
    dateOpacity:{
        flex:1, 
        flexDirection:'row',
    },

})