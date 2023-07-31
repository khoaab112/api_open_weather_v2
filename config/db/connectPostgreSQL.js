'use strict';
const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const {
    HOST,
    DATABASE,
    USER,
    PASSWORD,
    PORT_DB
} = process.env;

console.log(USER);


var client = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT_DB,
});

// client.connect((err, client, release) => {
//     if (err) {
//         console.error('Lỗi kết nối', err);
//         return false;
//     }
//     console.log('Kết nối thành công!');
//     return true;
// });
// const connectDB = async() => {
//     client.connect((err, client, release) => {
//         if (err) {
//             console.error('Lỗi kết nối', err);
//             return false;
//         }
//         console.log('Kết nối thành công!');
//         return true;
//     });
// };

const connectDB = () => {
    return new Promise((resolve, reject) => {
        client.connect((err, client, release) => {
            if (err) {
                console.error('Lỗi kết nối', err);
                reject(false);
            } else {
                console.log('Kết nối thành công!');
                resolve(true);
            }
        });
    });
};

function disconnectDB() {
    client.end();
    // client.on('exit', () => {
    //     pool.end();
    // })
};

const test = async() => {
    try {
        const connect = await connectDB()
        if (connect) {
            const res = await client.query('SELECT * FROM staff_account')
            return res;
        } else {}

    } catch (err) {
        console.log({ 'lỗi config': err })
    }
}

const query = async(text, params) => {
    try {
        const connect = await connectDB()
        const result = await client.query(text, params);
        return result;
    } catch (err) {
        console.log({ 'lỗi query': err })
            // return res.send({ 'code': 404, message: 'error', results: weatherData });
    }
};

module.exports = {
    query,
    test,
};