// cca_predicts.js

const mongoose = require('mongoose');
const ccaSchema = require('../schemas/density_scatters')

// 输出(导出)
module.exports = mongoose.model('model_results', ccaSchema); // 定义一个cca_predicts模型，可以根据这个模型调用其API方法。