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


const client = new Client({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT_DB,
});

client.connect((err, client, release) => {
    // console.log(client);
    if (err) {
        return console.error('Lỗi kết nối', err);
    }
    console.log('Kết nối thành công!');
});

// const res = client.query('select *from staff_account')
// console.log(res)

// client.on('exit', () => {
//     pool.end();
// })
// module.exports = {
//     client,
// };
const test = async() => {
    try {
        await client.connect()
        const res = await client.query('SELECT * FROM staff_account')
        console.log(22, res)
    } catch (err) {
        console.log({ 'lỗi config': err })
    }
}

const query = async(text, params) => {
    // const connect = await client.connect();
    // console.log(connect);



    try {
        const result = await connect.query(text, params);
        return result;
    } finally {
        connect.release();
    }
};

module.exports = {
    query,
    test,
};