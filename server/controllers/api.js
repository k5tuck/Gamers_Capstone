const { layout } = require("../utils");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { User, Comment, Post, Game, Follower } = require("../models");
const UPLOAD_URL = "/uploads/media/";


const getFollowers = (req, res) => {
    const {id} = req.session.user

    const followers = await Follower.findAll({
        where: {
            followeeid: id
        },
        include: User
    })

    const following = await Follower.findAll({
        where: {
            followerid: id
        },
        include: User
    })

    res.json({
        message: "Sending Followers",
        followers, 
        following
        })
}

const saveFollowers = (req, res) => {
  const { id } = req.body;
  const sessionid = req.session.user.id;

  const savedFollower = await Follower.create({
      followeeid: id,
      followerid: sessionid
  })

  res.json("Follow Saved")
};

module.exports = {
  saveFollowers,
  getFollowers
};
