const { layout } = require("../utils");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const {
  User,
  Comment,
  Post,
  Game,
  Follower,
  Game_Junction,
} = require("../models");
const UPLOAD_URL = "/uploads/media/";

const getFollowers = async (req, res) => {
  const { id } = req.session.user;

  const followers = await Follower.findAll({
    where: {
      followeeid: id,
    },
    include: User,
  });

  const following = await Follower.findAll({
    where: {
      followerid: id,
    },
    include: User,
  });

  res.json({
    message: "Sending Followers",
    followers,
    following,
  });
};

const saveFollowers = async (req, res) => {
  const { id } = req.body;
  const sessionid = req.session.user.id;

  const savedFollower = await Follower.create({
    followeeid: id,
    followerid: sessionid,
  });

  res.json("Follow Saved");
};

const getAllGames = async (req, res) => {
  const getallgames = await Game.findAll({
    attributes: ["title", "id"],
  });
  res.json({ message: "All Games", getallgames });
};

const saveGames = async (req, res) => {
  const { id } = req.body;
  const sessionid = req.session.user.id;

  const saveTopFive = await Game_Junction.create({
    gameid: id,
    userid: sessionid,
  });

  res.json("Created Game Entry");
};
const getGames = async (req, res) => {
  const { id } = req.session.user;
  const topFive = await Game_Junction.findAll({
    where: {
      userid: id,
    },
    //     attributes: [

    //     include: Game,
    //     order: ,
    // ]
  });

  res.json({ message: "Sending Top Five", topFive });
};

module.exports = {
  saveFollowers,
  getFollowers,
  getAllGames,
  saveGames,
  getGames,
};
