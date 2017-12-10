const mongooes = require('mongooes');
const Schema = mongooes.Schema;

const UserSchema = new Schema({
  email:{type:String, unique:true, lowercase:true },
  name:String,
  password:String,
  photo:String,
  tweets:[{
    tweet:{type:Schema.Types.ObjectId,ref:'Tweet'}
  }]
})
module.exports = mongooes.model('User', UserSchema);
