'use strict'
const modelTest = require('../models/test.js');


const test = async(req, res, next) => {
    try {
        let data = await modelTest.test();
        console.log(JSON.stringify(data));
        res.send({ 'data': data });
    } catch (error) {
        res.send('error: ' + error.message);

    }
}

module.exports = {
    test
}