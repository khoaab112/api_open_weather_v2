'use strict';
const models = require('../models/modelWeather.js');

const res = models.getDefaultLocation
const taskToDo20Minute = async() => {
    const intervalTime = 20 * 60 * 1000;
    setInterval(res, intervalTime);
}