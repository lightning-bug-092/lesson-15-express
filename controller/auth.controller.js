var db = require("../db.js");
module.exports.login = function(req, res) {
  res.render("./auth/login.pug");
}
module.exports.postLogin = function(req,res){
  var mail = req.body.mail;
  var password = req.body.password;
  var user = db.get('users').find({mail: mail}).value();
  if(!user){
    res.render("./auth/login.pug",{
      errors:['user is not exist']
    });
    return;
  }
  if(password!== user.password){
    res.render("./auth/login.pug",{
      errors:['wrong password']
    });
    return;
  }
  console.log(user.id)
  res.cookie('userId',user.id);
  res.redirect('/users');
}