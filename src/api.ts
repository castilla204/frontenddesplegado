import axios from 'axios';


const api = axios.create({
    baseURL: 'http://acc6c9d12038e4de78606b0ce820fd85-554661666.us-east-1.elb.amazonaws.com/',
  });

export default api;