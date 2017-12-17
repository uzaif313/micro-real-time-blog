const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.serializeUser(function(user,done){
	done(null,user.id)
})


passport.deserializeUser(function(id, user){
	User.findById(id,function(err,user){
		done(err, user);
	});
})

