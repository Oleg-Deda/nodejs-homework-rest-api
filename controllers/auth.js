const { ctrlWrapper, statusError, sendEmail } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const { jimpResizer } = require("../helpers");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const { nanoid } = require("nanoid");


const { JWT_KEY: key, BASE_URL } = process.env;

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await User.findOne({ email });
  if (registeredUser) {
    throw statusError(409, "Email alredy in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);
  
	     res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw statusError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw statusError(404, "User not found");
  }

  if (user.verify) {
    throw statusError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await User.findOne({ email });

  if (!registeredUser) {
    throw statusError(401, "Email or password is wrong");
  }
  const isValidPassword = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isValidPassword) {
    throw statusError(401, "Email or password is wrong");
  }

  if (!registeredUser.verify) {
    throw statusError(401, "Email not verified");
  }

  const payload = { id: registeredUser._id };
  const token = jwt.sign(payload, key, { expiresIn: "8h" });
  await User.findByIdAndUpdate(registeredUser._id, { token });
  res.status(201).json({
    token,
    user: {
      email: registeredUser.email,
      subscription: registeredUser.subscription,
	  
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({ message: "No Content" });
};

const updateSubscription = async (req, res) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];

  const user = await User.findOne({ token });
  const updatedUserSubscription = await User.findByIdAndUpdate(
    user._id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedUserSubscription);
  console.log(token);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    await jimpResizer(tempUpload);
    const newName = `${_id}_${originalname}`;
    const distUpload = path.join(avatarsDir, newName);

    await fs.rename(tempUpload, distUpload);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = {
  createUser: ctrlWrapper(createUser),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  userLogin: ctrlWrapper(userLogin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
