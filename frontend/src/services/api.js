import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://33e1-2804-14d-68b2-2e8-30d5-cb30-ce5e-a5a.ngrok.io'
})