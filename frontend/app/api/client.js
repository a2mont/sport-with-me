import Axios from 'axios';

export default Axios.create({
    baseURL: 'http://134.21.138.65:3030/'   //  home : 'http://192.168.1.109:3030/' mobile :'http://192.168.43.212:3030/'
});