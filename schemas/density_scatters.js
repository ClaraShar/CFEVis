// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'Male':Number,
    'Age':Number,
    'Debt':Number,
    'Married':Number,
    'BankCustomer':Number,
    'EducationLevel':Number,
    'Ethnicity':Number,
    'YearsEmployed':Number,
    'PriorDefault':Number,
    'Employed':Number,
    'CreditScore':Number,
    'DriversLicense':Number,
    'Citizen':Number,
    'ZipCode':Number,
    'Income':Number,
    'Approved':Number,
    'Probs':Number,
    'Class':Number,
})
