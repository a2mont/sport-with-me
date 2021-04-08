import Axios from 'axios';

export default Axios.create({
    baseURL: 'http://192.168.43.212:3030/'
});