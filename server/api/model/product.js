const connect = require('../db/connect');
const select = (options) => {
    let {
        page = 1,
        pageSize = 10,
        filter
    } = options
    let sql = `select * from product`
    let where = '';
    if (filter) {
        where += ' where';
        let index = 0;
        filter = JSON.parse(filter)
        for (var key in filter) {
            if (filter[key]) {
                if (index != 0) {
                    where += ' and'
                }
                if (typeof filter[key] == 'object') {
                    // select * from test where id>=2 and id<=4;
                    where += ' ' + key + '>=' + filter[key][0] + ' and ' + key + '<=' + filter[key][1];
                } else {
                    where += ' ' + key + '=' + filter[key];
                }
                index += 1
            }
        }
    }
    console.log(sql + where + ` limit ${(page - 1) * pageSize},${pageSize}`)
    console.log('select count(*) from product' + where)
    return new Promise((resolve, reject) => {
        connect.query(sql + where + ` limit ${(page - 1) * pageSize},${pageSize}`, [], (err, res) => {
            if (err) {
                reject()
                return;
            }
            connect.query('select count(*) from product' + where, [], (err2, res2) => {
                if (err2) {
                    reject();
                    return
                }
                // console.log(res2[0]['count(*)']) //30条数据
                resolve({
                    count: res2[0]['count(*)'],
                    list: res
                })
            })

        })
    })
}
const update = (id, options) => {

    let sql = 'update product set'
    for (var key in options) {
        sql += ' ' + key + '=' + options[key]
    }
    sql += ' where id=' + id;
    return new Promise((resolve, reject) => {
        connect.query(sql, [], (err, res) => {
            if (err) {
                reject()
                return;
            }
            detail({ id: id }).then((res) => {
                // console.log(res)
                resolve(res)
            })
        })
    })
}
const detail = (options) => {
    const sql = 'select * from product where `id`=?'
    return new Promise((resolve, reject) => {
        connect.query(sql, [options.id], (err, res) => {
            if (err) {
                reject()
                return;
            }
            resolve(res[0])
        })
    })
}

// const group = ()=>{
//     const sql = 'select * from `group`'

//    return new Promise((resolve,reject)=>{
//     connect.query(sql,[],(err,res)=>{
//         if (err){
//             reject()
//             return;
//         } 
//         const list = [];
//         res.forEach((item,index)=>{
//             const groupList = new Promise((resolve,reject)=>{
//                 // console.log(item.goods)
//                 const sq2 = `select * from product where id in (${item.goods})`
//                 connect.query(sq2,[],(err,res)=>{
//                     resolve(res)
//                 })
//             })
//             list.push(groupList)

//         })
//         Promise.all(list).then((rest)=>{
//             const data = res.map((item,index)=>{
//                 return Object.assign({},item,{
//                     goods:rest[index]
//                 })
//             })
//             resolve(data)
//         })
//     })
//    })
// }


const remove = (id) => {
    const sql = 'DELETE FROM product WHERE `id` = ?';
    console.log(sql)
    return new Promise((resolve, reject) => {
        connect.query(sql, [id], (err, res) => {
            if (err) {
                reject()
                return;
            }
            resolve(res)
        })
    })
}



module.exports = {
    select,
    update,
    // group,
    detail,
    remove
}