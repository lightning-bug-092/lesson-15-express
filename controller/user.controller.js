var db = require("../db.js");
var shortId = require('shortid');
module.exports.index = function(req, res) {
  var users = db.get("users").value();
  res.render("./users/users.pug", {
    users: users
  });
}
module.exports.create = function(req, res) {
  res.render("./users/create.pug");
};
module.exports.update = function(req, res) {
  res.render("./users/update.pug");
};
module.exports.delete = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("./users/delete.pug", {
    user: user
  });
}
module.exports.postCreate = function(req, res) {
  req.body.id = shortId.generate();
  req.body.password = "123123";
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ phoneNumber: req.body.phoneNumber })
    .write();
  res.redirect("/users");
};
module.exports.postDelete = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};