// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'Age':Number,
    'Debt':Number,
    'PriorDefault': Number,
    'Employed': Number,
    'YearsEmployed':Number,
    'CreditScore':Number,
    'Income':Number,
    'EducationLeval': Number,
    'Approved':String,
})
