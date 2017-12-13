const router = require("express").Router();
const User   = require("../models/user");

router.route("/signup")
      .get((req,res,next)=>{
        res.render("user/sign_up", {message:req.flash('errors')})
      })
      .post((req,res,next)=>{
        User.fineOne({email:req.body.email},function(err,existingUser){
          if(existingUser){
            req.flash("Ohh This Email Already exist");
          }else{
            var user = new User();
            user.email = req.body.email;
            user.name  = req.body.name;
            user.photo = user.gravatar();
            user.password = req.body.password;
            user.save(function(err){
              if (err) return next(err)
              res.redirect("/")
            })
          }
        })
      })

module.exports = router;