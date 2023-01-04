// cca_predicts.js

const mongoose = require('mongoose');
// const ccaSchema = require('../schemas/density_scatters')
const ccaSchema = require('../schemas/train_heatmaps.js')

// 输出(导出)
module.exports = mongoose.model('train_heatmaps', ccaSchema); // 定义一个cca_predicts模型，可以根据这个模型调用其API方法。
// cca_predicts是标准化数据，这里想用归一化数据，train_heatmaps只有训练数据集，正经该用model_results