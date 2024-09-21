const Users = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userHasEmail = await Users.findOne({ email });

  if (userHasEmail) {
    res.status(400).json({
      message: "User Already Exists",
    });
  }

  const user = await Users.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//login User
const loginUser = async (req, body) => {
  const { email, password } = req.body;
  const isUserfound = await Users.findOne({ email });

  if (isUserfound && (await isUserfound.matchPassword(password))) {
    res.status(200).json({
      _id: isUserfound._id,
      name: isUserfound.name,
      email: isUserfound.email,
      token: generateToken(isUserfound._id),
    });
  } else {
    res.status(401).json({ message: "Invalid login credentials" });
  }
};

module.exports = { registerUser, loginUser };