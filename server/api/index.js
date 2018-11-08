var express = require('express');
var router = express.Router();
const connect = require('./db/connect')
const ckeckToken = require('./middleware/checkToken')


const User = require('./controller/user')
const Product = require('./controller/product')


/* GET home page. */
router.post('/login',User.login)
router.get('/user/info',ckeckToken,User.info)

router.get('/product/list',Product.productList)

router.post('/product/status',Product.updateStatus)
router.post('/product/delete',Product.deletes)

module.exports = router;
