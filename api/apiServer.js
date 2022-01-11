var express = require('express')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var routers = require('./routes/index')

const app = new express()
routers(app)

var dbPort = '27017'
var dbHost = 'localhost'
var port = 3033

mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://${dbHost}:${dbPort}/CFE`, function (err) {
    if(err){
        console.log(err, '数据库连接失败');
        return;
    }
    console.log('数据库连接成功')
    app.listen(port, function (err) {
        if(err){
            console.log('err:', err);
        }
        else{
            console.info(`===> api server is running at 127.0.0.1:${port}`)
        }
    });
})

mongoose.set("debug", true)