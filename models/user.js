const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email:{type:String, unique:true, lowercase:true },
  name:String,
  password:String,
  photo:String,
  tweets:[{
    tweet:{type:Schema.Types.ObjectId,ref:'Tweet'}
  }]
})


UserSchema.pre("save",function(next){
  var user = this
  if(!user.isModified('password')) return next();
  if(user.password){
    bcrypt.getSalt(10,function(err,salt){
      if(err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err,hash){
        if(err) return next()
        user.password = hash;
        next(err)
      })
    })
  }
})

module.exports = mongoose.model('User', UserSchema);
