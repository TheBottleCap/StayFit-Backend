const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const Users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

Users.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

Users.methods.matchPassword = async function (enteredPass) {
    return await bcryptjs.compare(enteredPass,this.password)
}

module.exports = mongoose.module("Users", Users);
