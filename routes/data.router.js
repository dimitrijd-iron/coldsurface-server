const express = require("express");
const dataRouter = express.Router();
const Stats = require("../models/statistic.model");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middleware");

//GET '/data'
dataRouter.get(
  "/data",
  // isNotLoggedIn,
  // validationLogin,
  async (req, res, next) => {
    console.log("in data router");
    try {
      const data = await Stats.find();
      if (!data) {
        return next(createError(400)); // Bad Request
      }
      res
        .status(201) // Created
        .json(data);
    } catch (error) {
      next(createError(error)); // Internal Server Error (by default)
    }
  }
);

module.exports = dataRouter;
