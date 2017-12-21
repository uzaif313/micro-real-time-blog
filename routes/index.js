const router = require("express").Router();
const User = require("../models/user");
router.get("/",(req, res, next)=>{
  console.log(req)
  res.render("main/home")
  // render admin layout
  // res.render("main/home",{layout:"admin"})
})

router.post("/users", (req,res,next) => {
  let {email,name,password} = req.body
  // res.json({email,name,password})
  let user = new User({email, name, password})
  user.save(function (err) {
  if (err) {
    res.json(err);
  } else {
    res.json(user);
  }
});
})

module.exports = router;
