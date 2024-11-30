import api from './api.js';
import { to } from '../utils/async-promise.js';

const createUser = async(data)=>{
    return await to(api.post('/user',data))
};

const checkUser = async(data)=>{
    return await to(api.post('/user/check',data))
};

export {createUser,checkUser};