'use strict';
const dotenv = require('dotenv');
const axios = require('axios');
const logger = require('../controllers/winston');
const handleData = require('./apiWeather.js');
dotenv.config();
const {
    API_KEY,
    DEFAULT_LOCATION_LATITYDE,
    DEFAULT_LOCATION_LONGITUDE
} = process.env;


const lang = 'vi'
const units = 'metric'
    //lấy thông tin hn
async function getDefaultLocation(res, req, next) {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: DEFAULT_LOCATION_LATITYDE,
                lon: DEFAULT_LOCATION_LONGITUDE,
                appid: API_KEY,
                lang: lang,
                units: units
            }
        });

        const weatherData = await convertData(response.data);
        await handleData.insertDataOrUpdate(weatherData);
        return res.send({ 'code': 200, message: 'success', results: weatherData });
    } catch (error) {
        console.error(error);
        logger.error(new Error(error));
        return res.send({ 'code': 500, message: 'error', results: null });
    }
}
async function convertData(data) {
    const name = 'get weather' + data.name;
    const city = data.name;
    const longitude = data.coord.lon;
    const latityde = data.coord.lat;
    const content = {
        'weather': data.weather[0],
        'main': data.main,
    };
    return data = {
        name,
        city,
        longitude,
        latityde,
        content,
    }
}

//tự động lấy 20ph rồi put vào database
//ghi log
//tạo hàm lấy tọa độ trong database rồi put vào
module.exports = {
    getDefaultLocation
}