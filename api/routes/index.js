var express = require('express')

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    app.get('/',function(req,res){
      res.send('hello world')
    })

    app.get('/api/getBoxplotData', require('./getBoxplotData'))
    app.get('/api/getHeatmapplotData', require('./getHeatmapplotData'))
}