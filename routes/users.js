const router = require("express").Router();
const User   = require("../models/user");
const passport = require("passport");
const passportConfig = require("../config/passport");
router.route("/signup")
      .get((req,res,next)=>{
        res.render("user/sign_up", {message:req.flash('errors')})
      })
      .post((req,res,next)=>{
        User.findOne({email:req.body.email},function(err,existingUser){
          if(existingUser){
            req.flash("Ohh This Email Already exist");
          }else{
            var user = new User();
            user.email = req.body.email;
            user.name  = req.body.name;
            user.photo = user.gravtar();
            user.password = req.body.password;
            user.save(function(err){
              if (err) return next(err)
              res.redirect("/")
            })
          }
        })
      })

router.route("/login")
.get((req, res, next)=>{
	if(req.user) res.redirect("/")
	res.render("user/sign_in",{message:req.flash("msg")})
})
.post(
	passport.authenticate("local-login",{
		successRedirect:"/",
		failureRedirect:"/login",
		failurFlash:true
	}))


module.exports = router;
