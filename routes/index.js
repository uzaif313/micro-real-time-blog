const router = require("express").Router();

router.get("/",(req, res, next)=>{
  res.render("main/home")
  // render admin layout 
  // res.render("main/home",{layout:"admin"})
})

module.exports = router;
