let util = require('./util')
let boxplotDataModel = require('../../models/cca_predicts')

function queryBoxplotData(req, res) {
    new Promise((resolve, reject) => {
        boxplotDataModel.find({}) //筛选盒须图数据
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryBoxplotData