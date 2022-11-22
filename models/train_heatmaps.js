const mongoose = require('mongoose');
const ccaSchema = require('../schemas/train_heatmaps.js')

// 输出(导出)
module.exports = mongoose.model('train_heatmaps', ccaSchema); // 定义一个cca_predicts模型，可以根据这个模型调用其API方法。