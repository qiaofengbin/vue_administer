const User = require('../model/user')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
    const {
        username,
        password
    } = req.body
    const userInfo = await User.findUser({
        username,
        password
    })
    if (userInfo) {
       res.cookie('token', jwt.sign({
        username:username,
        password:password,
        id:userInfo.id
    }, 'lechun'), {
            maxAge: 60 * 1000 * 24
        })
        res.json({
            code: 1,
            data:userInfo
        })
    } else {
        res.status(401)
        res.json({
            code: 0,
            msg: '用户名密码错误'
        })
    }

}

const info = async (req, res, next) => {
    const token = jwt.decode(req.cookies.token, 'lechunguanwang');
    const id = token.id;
    const userInfo = await User.userInfo({
        id
    })
    res.json({
        code: 1,
        data: userInfo
    })
}
module.exports = {
    login,
    info
}