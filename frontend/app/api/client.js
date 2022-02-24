import Axios from 'axios';
import {HOST} from '@env';

export default Axios.create({
    baseURL: HOST,
});  