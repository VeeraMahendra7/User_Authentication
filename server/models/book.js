const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Book',bookSchema);