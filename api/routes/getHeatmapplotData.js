let util = require('./util')
let heatmapplotDataModel = require('../../models/train_heatmaps')

function queryHeatmapplotData(req, res) {
    new Promise((resolve, reject) => {
        heatmapplotDataModel.find({})
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