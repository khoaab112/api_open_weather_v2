const db = require('../../config/db/connectPostgreSQL.js');



var test = async() => {
    try {
        const res = await db.test();
        // const res = await db.query('select * from staff_account');
        return res.rows; // Trả về dữ liệu từ các hàng của kết quả truy vấn
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        return false;
    }
}

module.exports = {
    test,
}