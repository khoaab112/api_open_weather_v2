'use strict';
const db = require('../../config/db/connectPostgreSQL.js');


// const insertData = (res) => {
//     // const { name, city, longitude, latityde, content } = res;
//     const { name, city, longitude, latityde, content } = res;

//     pool.query('INSERT INTO api_weather (name,city,longitude,latityde,content)' +
//         +' VALUES ($1, $2,$3,$4,$5) RETURNING *', [name, city, longitude, latityde, content],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(201).send(`User added with ID: ${results.rows[0].id}`)
//         })
// }

const insertDataOrUpdate = async(res) => {
    try {
        const city = [res.city];
        const params = [res.name, res.city, res.longitude, res.latityde, res.content]
        const queryCity = 'select city from api_weather where city=$1';
        const resultSearch = await db.query(queryCity, city);
        if (resultSearch.rowCount >= 1) {
            //update
            const commandUpdate = 'UPDATE api_weather SET name=$1 , city=$2, longitude=$3, latityde=$4 , content=$5 WHERE city=$2';
            const result = await db.query(commandUpdate, params);
        } else {
            const text = 'INSERT INTO api_weather (name,city,longitude,latityde,content) VALUES ($1, $2,$3,$4,$5)'
            const result = await db.query(text, params);
        }
    } catch (err) {
        console.log(err);
        return false;
    }

};

module.exports = {
    insertDataOrUpdate
}