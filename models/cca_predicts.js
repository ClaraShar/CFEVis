// cca_predicts.js

const mongoose = require('mongoose');
const ccaSchema = require('../schemas/cca_predicts')

// 输出(导出)
module.exports = mongoose.model('density_scatters', ccaSchema); // 定义一个cca_predicts模型，可以根据这个模型调用其API方法。
// cca_predicts里面是std数据，cca_logs是log数据，density_scatters有源数据