const asyncHandler = require("express-async-handler");

// const updateLastSeen = asyncHandler(async (req, res, next) => {
//     if (req.user) {
//       req.user.lastSeen = Date.now();
//       await req.user.save();
//     }
//     next();
//   });


const updateLastSeen = asyncHandler(async (req, res, next) => {
    if (req.user) {
      console.log("User found:", req.user);
      req.user.lastSeen = Date.now();
      await req.user.save();
    } else {
      console.log("No user found in request");
    }
    next();
  });
  

  module.exports={updateLastSeen}