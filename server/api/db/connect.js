const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', //# 主机名
    user: 'root',  // # 用户名
    database: 'lechun',//# 数据库名称
    port:'3306',
    insecureAuth:true
});

connection.connect((err)=>{
    console.log(err)
});// #创建链接

module.exports = connection