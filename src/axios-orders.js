import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerapp-cc413.firebaseio.com/'
})

export default instance;