const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User in protect middleware:", req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select("-password");

//         // Update lastSeen timestamp to indicate user is online
//         req.user.lastSeen = Date.now();
//         await req.user.save();

//         next();
//       } catch (error) {
//         res.status(401);
//         throw new Error("Not authorized, token failed");
//       }
//     }

//     if (!token) {
//       res.status(401);
//       throw new Error("Not authorized, no token");
//     }
//   });

module.exports = { protect };
