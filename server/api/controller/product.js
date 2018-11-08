
const Product = require('../model/product')
const productList = async (req, res, next) => {
    // console.log(req.query)
    const list = await Product.select(req.query)
    
    res.json({
        code: 1,
        data: list
    })
}
const updateStatus = async (req, res, next) => {
    const list = await Product.update(req.body.id, {
        status: req.body.status
    })

    res.json({
        code: 1,
        data: list
    })
}

const deletes = async (req, res, next) => {

    const { id } = req.body;
    console.log(req.body.id)
    const list = await Product.remove(id);
    // console.log(list)
    try{
        res.json({
            code:1,
            msg:'删除成功'
        })
    } catch(e){
        res.json({
            code:1,
            msg:'删除失败'
        })
    }
}
// const Group = async (req,res,next)=>{
//     const list = await Product.group()
//      res.json({
//          code:1,
//          data:list
//      })
//  }

//  const Detail = async (req,res,next)=>{
//     const list = await Product.detail({id:req.query.id})
//      res.json({
//          code:1,
//          data:list
//      })
//  }

module.exports = {
    productList,
    updateStatus,
    deletes
    // Group,
    // Detail
}