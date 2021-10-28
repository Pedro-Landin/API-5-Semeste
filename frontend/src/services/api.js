import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://8d9a-201-75-171-195.ngrok.io'
})