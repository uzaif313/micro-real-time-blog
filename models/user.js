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

UserSchema.methods.gravtar = function (size) {
  if(!size) size = 200;
  if(!this.email) return `https://gravtar.com/avatar/?s=${size}+&d=retro`;
  let md5 = crypto.createHash("md5").update(this.email).digest('hex')
  return `https://gravtar.com/avatar/${md5}+?s=${size}&d=retro`
}

module.exports = mongoose.model('User', UserSchema);
