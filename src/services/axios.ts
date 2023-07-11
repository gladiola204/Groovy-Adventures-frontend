import axios from 'axios';

const token = 'coś';

const request = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    validateStatus: () => true,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export default request;