import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

instance.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['id'] = "1733046";
    config.params['appid'] = "3233208bd33348ca183288e75804da85";
    config.params['units'] = "metric";
    return config;
});

export default instance;