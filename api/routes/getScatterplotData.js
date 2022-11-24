let util = require('./util')
let scatterplotDataModel = require('../../models/density_scatters')

function queryScatterplotData(req, res) {
    new Promise((resolve, reject) => {
        scatterplotDataModel.find({},{ Age: 1, PriorDefault: 1, Debt: 1, YearsEmployed: 1, CreditScore: 1, Income: 1, Approved: 1})
        .then(result => {
            let responseData = { data: {}}
            responseData.data = result;
            util.responseClient(res, 200, 1, 'success', responseData);
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = queryScatterplotData