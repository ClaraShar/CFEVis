// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'Age':Number,
    'Debt':Number,
    'Years':Number,
    'Score':Number,
    'Income':Number,
    'Approved':String,
})
