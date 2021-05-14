import Client from './client';

const SUCCESS = 200;
const CREATED = 201;
const INVALID_REQUEST = 400;
const NOT_FOUND = 404;
const NOT_UNIQUE = 409; 

const getAllActivities = async () => {
    try{
        const response = await Client.get('/activities/');
        if (response.status == SUCCESS){
            //console.log(response.data);
            return response.data;
        }else{
            console.log('Could not load activities, error status :' + response.status);
            return [];
        }
    }catch (error){
        console.log('Error while getting all activities');
        console.log(error);
        return [];
    }
}

const createUser = async (person) => {
    try{
        const response = await Client.post('/register', {
            email: person.email,
            password: person.password,
            firstname: person.firstname,
            lastname: person.lastname,
        });
        if (response.status == CREATED){
            //console.log(response.data);
            return response.data;
        }else if (response.status == NOT_UNIQUE){
            console.log('User already exist')
            return null;
        }else{
            console.log('Could not create user, error status :' + response.status);
            return null;
        }
    }catch(error){
        console.log('Error while creating user');
        console.log(error);
        return null;

    }

}

const createActivity = async (user, activity, jwt) => {
    try {
        const response = await Client.post('/activities/',
            {
                sport: activity.sport,
                creator: {
                    id: user.id
                },
                date: activity.date,
                latitude: activity.latitude,
                longitude: activity.longitude,
                
            }, 
            {
                headers: {
                    token: jwt,
                },
            }
        );
        if (response.status == CREATED){
            console.log(response.data);
            return response.data;
        }else if (response.status == INVALID_REQUEST){
            console.log('Invalid request')
            return null;
        }else{
            console.log('Could not create activity, error status :' + response.status);
            return null;
        }
    } catch (error) {
        console.log('Error while creating activity');
        console.log(error);
        return null;
    }
}

const login = async (person) => {
    try {
        const response = await Client.post('/login', {
            email: person.email,
            password: person.password,
        });
        if(response.status == SUCCESS){
            console.log(response.data);
            return response.data;
        }else if (response.status == NOT_FOUND){
            console.log('Could not register user, error status :' + response.status);
            return null;
        }
    } catch (error) {
        console.log('Error while registering');
        console.log(error);
        return null;
    }
} 

export default {
    getAllActivities,
    createUser,
    login,
}