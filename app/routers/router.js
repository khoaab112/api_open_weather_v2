const express = require('express');
const winston = require('../controllers/winston');
const router = express.Router();
const modelAPI = require('../models/modelWeather');
const test = require('../controllers/test');

router.get('/', async(res, req, next) => {
    try {
        modelAPI.getDefaultLocation(req, res, next)
    } catch (error) {
        winston.error(new Error(error));
        return res.send({ 'code': 500, message: 'error', results: null });
    }
});

router.get('/test', test.test);

module.exports = {
    router
}