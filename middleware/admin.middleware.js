var db = require('../db')
module.exports.admin = function(req,res,next){
  var user = db.get('users').find({id: req.cookies.userId}).value();
  if(user.isAdmin){
    res.redirect('/users');
    return;
  }
  next();
}