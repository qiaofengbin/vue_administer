const connect = require('../db/connect');

const findUser = ({
    username,
    password
}) => {
    const sql = 'select * from admin_user where username=? and password=?'
    return new Promise((resolve, reject) => {
        connect.query(sql, [username, password], (err, res) => {
            if (err) {
                reject()
                return;
            }
            resolve(res[0])
        })
    })
}
const userInfo = ({
    id
}) => {
    const sql = 'select * from admin_user where `id`=?'
    return new Promise((resolve, reject) => {
        connect.query(sql, [ id], (err, res) => {
            if (err) {
                reject()
                return;
            }
            resolve(res[0])
        })
    })
}

module.exports = {
    findUser,
    userInfo
}