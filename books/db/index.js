var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/bookstore');
var BookSchema=new mongoose.Schema({
    bookName:String,
    bookCover:String,
    bookPrice:Number
},{collection:'books'});
exports.Book=mongoose.model('Book',BookSchema);