var express = require('express')

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    app.get('/',function(req,res){
      res.send('hello world')
    })

    //获取单一数据的特征
    app.get('/api/getBoxplotData', require('./getBoxplotData'))
}