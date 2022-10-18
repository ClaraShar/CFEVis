// 定义一个Schema
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    'Male':String,
    'Age':Number,
    'Debt':Number,
    'Married':String,
    'BankCustomer':String,
    'EducationLevel':String,
    'Ethnicity':String,
    'YearsEmployed':Number,
    'PriorDefault':String,
    'Employed':String,
    'CreditScore':Number,
    'DriversLicense':String,
    'Citizen':String,
    'ZipCode':Number,
    'Income':Number,
    'Approved':String,
})
