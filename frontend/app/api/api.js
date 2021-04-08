import Client from './client';

const SUCCESS = 200;

const getAllActivities = async () => {
    try{
        const response = await Client.get('/activities/');
        if (response.status == SUCCESS){
            //console.log(response.data);
            return response.data;
        }else{
            console.log('Could not load activities, error status :' + response.status);
        }
    }catch (error){
        console.log('Error while getting all activities');
        console.log(error);
        return [];
    }
}

export default {
    getAllActivities,
}