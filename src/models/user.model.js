const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  name: { type: String, Required: true },
  email: { type: String, Required: true },
    password: { type: String, Required: true },
  IPADRESS:{type:String},
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };