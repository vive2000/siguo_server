var mongoose=require('mongoose');
var db=mongoose.connect('mongodb://localhost/siguo');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    name:String,
    password:String});
var matchSchema=new Schema({
    formation:String});
    
exports.user=db.model('users',userSchema);
exports.match=db.model('matches',matchSchema);
exports.n="hello";