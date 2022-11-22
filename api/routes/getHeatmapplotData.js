let util = require('./util')
let heatmapplotDataModel = require('../../models/train_heatmaps')

function queryHeatmapplotData(req, res) {
    new Promise((resolve, reject) => {
        heatmapplotDataModel.find({},{ Age: 1, PriorDefault: 1, Debt: 1, Years: 1, Score: 1, Income: 1, Approved: 1})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryHeatmapplotData