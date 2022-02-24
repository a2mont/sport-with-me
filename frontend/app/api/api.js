import Client from './client';
//#region Status Codes
const SUCCESS = 200;
const CREATED = 201;
const DELETED = 204;
const INVALID_REQUEST = 400;
const NOT_FOUND = 404;
const NOT_UNIQUE = 409; 
//#endregion

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

const getOneActivity = async (activityId) => {
    try {
        const address = '/activities/'+activityId;
        const response = await Client.get(address);
        if (response.status == SUCCESS){
            //console.log(response.data);
            return response.data;
        } else {
            console.log('Activity not found');
            return null;
        }
    } catch (error) {
        console.log('Error while getting activity');
        console.log(error);
        return null;
    }
}

const createUser = async (person) => {
    try{
        const response = await Client.post('/register', {
            email: person.email,
            password: person.password,
            name:{
                firstname: person.firstname,
                lastname: person.lastname,
            },
        });
        if (response.status == CREATED){
            //console.log(response.data);
           
        }else if (response.status == NOT_UNIQUE){
            console.log('User already exist')
        }else{
            console.log('Could not create user, error status :' + response.status);
        }
        return response.status;
    }catch(error){
        console.log('Error while creating user');
        //console.log(error);
        return error.response.status;

    }

}

const deleteUser = async (id, jwt) => {
    try {
        const bearer = "Bearer "+ jwt;
        const address = '/users/'+id;
        const response = await Client.delete(address,
            {
                headers: {
                    Authorization: bearer,
                },
            });
        if (response.status == DELETED){
            //console.log(response.data);
            return response.status;
        } else {
            console.log('User not found');
        }
        return response.status;
    } catch (error) {
        console.log('Error while getting activity');
        console.log(error);
        return error.response.status;
    } 
}

const createActivity = async (user, activity, jwt) => {
    try {
        const bearer = "Bearer "+ jwt;
        const id = parseInt(user);
        const newActivity = {
            sport: activity.sport,
            creator: {
                id: id
            },
            date: activity.date,
            location: activity.location,
            price: parseFloat(activity.price),
            public: activity.public,
            comments: activity.comments,
            participants: [id],
        };
        //console.log(newActivity);
        const response = await Client.post('/activities/', newActivity, 
            {
                headers: {
                    Authorization: bearer,
                },
            }
        );
        if (response.status == CREATED){
            //console.log('Created: \n' + response.data);
        }else if (response.status == INVALID_REQUEST){
            console.log('Invalid request')
        }else{
            console.log('Could not create activity, error status :' + response.status);
        }
        
        return response.status;
    } catch (error) {
        console.log('Error while creating activity');
        //console.log(error);
        return error.response.status;
    }
}

const updateActivity = async (activityId, newActivity, jwt) => {
    try {
        const bearer = "Bearer "+ jwt;
        const id = parseInt(activityId);
        const address = '/activities/'+ id;
        const response = await Client.put(address, newActivity, 
            {
                headers: {
                    Authorization: bearer,
                },
            }
        );
        if (response.status == SUCCESS){
            //console.log('Updated: \n' + response.data);
            return response.data;
        }else if (response.status == INVALID_REQUEST){
            console.log('Invalid request');
        }else{
            console.log('Could not update activity, error status :' + response.status);
        }
        return response.status;
    } catch (error) {
        console.log('Error while updating activity');
        console.log(error);
        return error.response.status;
    }
}

const login = async (person) => {
    try {
        //console.log(person);
        const response = await Client.post('/login', {
            email: person.email,
            password: person.password,
        });
        if(response.status == SUCCESS){
            //console.log(response.data);
            return response;
        }else if (response.status == NOT_FOUND){
            console.log('Could not register user, error status :' + response.status);
        }
    } catch (error) {
        console.log('Error while login in');
        //console.log(error);
        return error.response;
    }
} 

const getUserInfos = async (id) => {
    try {
        const address = '/users/'+id;
        const response = await Client.get(address);
        if (response.status == SUCCESS){
            //console.log(response.data);
            return response.data;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.log('Error while getting user');
        console.log(error);
        return null;
    }
}

const getUserActivities = async (id) => {
    try {
        const address = '/users/' + id + '/activities/';
        const response = await Client.get(address);
        if (response.status == SUCCESS){
            //console.log(response.data);
            return response.data;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.log('Error while getting user activities');
        console.log(error);
        return null;
    }
}

const deleteActivity = async (id, jwt) => {
    try {
        const bearer = "Bearer "+ jwt;
        const address = '/activities/'+id;
        const response = await Client.delete(address,
            {
                headers: {
                    Authorization: bearer,
                },
            });
        if (response.status == DELETED){
            //console.log(response.data);
        } else {
            console.log('Activity not found');
        }
        return response.status;
    } catch (error) {
        console.log('Error while getting activity');
        console.log(error);
        return error.response.status;
    } 
}
export default {
    getAllActivities,
    createUser,
    login,
    createActivity,
    getUserInfos,
    updateActivity,
    getUserActivities,
    deleteActivity,
    getOneActivity,
    deleteUser,
}