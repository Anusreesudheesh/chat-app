const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");

//asyncHandler automatically catches errors in async functions and forwards them to the error-handling middleware, simplifying code by removing the need for try/catch blocks.

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.json({
      message: "Registartion successfull",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create The user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      message: "Login successfull",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

//   /api/user?search=
// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};
//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//   res.send(users);
// });

const allUsers = asyncHandler(async (req, res) => {
  const search = req.query.search;
  const onlineThreshold = new Date(Date.now() - 5 * 60 * 1000); // 5-minute threshold for online status

  // Search filter if a search query is provided
  const keyword = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  try {
    // Get all users who match the search query
    const searchedUsers = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });

    // Determine online status for each searched user
    const usersWithStatus = searchedUsers.map((user) => {
      const isOnline = user.lastSeen >= onlineThreshold;
      return { ...user.toObject(), isOnline };
    });

    // Get all users who are online (regardless of search query)
    const onlineUsers = await User.find({
      lastSeen: { $gte: onlineThreshold },
      _id: { $ne: req.user._id },
    });

    res.json({
      onlineUsers, // Always show all online users
      searchedUsers: usersWithStatus, // Show search results with online/offline status
    });
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { registerUser, authUser, allUsers };
