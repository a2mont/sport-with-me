import Axios from 'axios';

export default Axios.create({
    baseURL: 'http://192.168.1.3:3030/'   //  home : 'http:/192.168.1.170:3030/' mobile :'http://192.168.43.212:3030/' uni : variable
});