const router = require("express").Router();

router.get("/",(req, res, next)=>{
  res.render("main/home")
  // res.json({name:"uzaif",age:"24"})
})

module.exports = router;
