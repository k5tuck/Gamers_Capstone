const multer = require("multer");
// const upload = multer({ dest: "public" + UPLOAD_URL });
const { layout } = require("../utils");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const UPLOAD_URL = "/uploads/media/";
const { Op } = require("sequelize");
const {
  User,
  Comment,
  Post,
  Game,
  Follower,
  Game_Junction,
  Tag,
  Tag_To_Post,
  Vote,
  sequelize,
} = require("../models");

const processPost = async (req, res) => {
  const { id, username } = req.session.user;
  const { file } = req;
  const { title, content, gameid } = req.body;
  // let mediaPic = file ? UPLOAD_URL + file.filename : "";
  const post = await Post.create({
    userid: id,
    username,
    title,
    // media: mediaPic,
    content,
    gameid,
  });

  res.json(post);

  // res.redirect("/members");
};

const processPostImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log("=========================================================");
  console.log(file);
  console.log("=========================================================");
  let mediaPic = file ? UPLOAD_URL + file.filename : "";
  const post = await Post.findOne({
    where: {
      id,
    },
  });
  post.media = mediaPic;
  await post.save();
  res.json(post);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  const games = await Game.findAll();

  res.json(id, post, games);

  //   res.render("createFormEdit", {
  //     locals: {
  //       post,
  //       games,
  //     },
  //     ...layout,
  //   });
};

const processEditPost = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log(id);
  const { title, content } = req.body;
  console.log(title);
  console.log(content);

  let data = {
    title,
    content,
  };
  // let mediaPic = file ? UPLOAD_URL + file.filename : "";

  if (file) {
    data["media"] = UPLOAD_URL + file.filename;
  }
  const updatedPost = await Post.update(data, {
    where: {
      id,
      userid: req.session.user.id,
    },
  });

  res.json("Edited Post succesfully");
  // res.redirect("/members");
};

const processNewUser = async (req, res) => {
  console.log(req.body);
  const { password, name, email, displayname, games } = req.body;
  let { username } = req.body;

  if (username == "" || password == "") {
    // res.redirect("/errorsignup");
    res.json("Username or Password is Blank!");
  } else {
    const hash = bcrypt.hashSync(password, 10); // auto salt!
    try {
      const dbUsername = username.toLowerCase();
      console.log("-------------------------");

      const newUser = await User.create({
        username: dbUsername,
        hash,
        name,
        email,
        displayname,
      });
      console.log(JSON.stringify(newUser, null, 4));
      console.log("-------------------------");

      let pArr = games.map((g) => {
        return Game_Junction.create({
          gameid: g.id,
          userid: newUser.id,
        });
      });
      await Promise.all(pArr);

      res.json({ message: "User Successfully Created", id: newUser.id });
    } catch (e) {
      console.log(e);
      if (e == "SequelizeUniqueConstraintError") {
        console.log("Username is Taken. Try Again!");
        res.json("Username is Taken. Try Again!");
      }
      // Previously -  Redirected User to Signup Page stating Username was taken
      // res.redirect("/takensignup");
    }
  }
};

const addImageToNewUser = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log(file);
  let mediaPic = file ? UPLOAD_URL + file.filename : "";
  const user = await User.findOne({
    where: {
      id,
    },
  });
  user.photo = mediaPic;
  await user.save();
  res.json("Image Successfully Saved");
};

const processLogin = async (req, res) => {
  const { username, password } = req.body;
  // const { loginid, password } = req.body;

  // I need to check the database!
  // Is that a valid user?

  // let userEmail = loginid.includes("@") ? loginid : "";
  // let userName = !loginid.includes("@") ? loginid : "" ;

  let finalloginName = username.toLowerCase();
  // let finalloginName = loginid.includes("@") ? loginid : loginid;
  // console.log(finalloginName);

  const user = await User.findOne({
    where: {
      [Op.or]: {
        username: finalloginName,
        email: finalloginName,
      },
    },
  });
  if (user) {
    // Is that their password?
    //res.send('we have a user!');
    const isValid = bcrypt.compareSync(password, user.hash);
    if (isValid) {
      req.session.user = {
        username: user.username,
        id: user.id,
        displayname: user.displayname,
      };
      req.session.save(() => {
        // res.redirect("/members");
        res.json("Session Saved");
      });
    } else {
      res.json("Wrong password! Try Again");
    }
  } else {
    res.json("User Does Not Exist");
  }
  //   res.render("loginPage", {
  //     locals: {},
  //   });
  // res.redirect('/members')
};

const processLogout = (req, res) => {
  console.log("Logging Out");
  req.session.destroy(() => {
    res.json("Session Destroyed");
  });
};

const getMainPhoto = async (req, res) => {
  const { id, displayname } = req.session.user;
  const user = await User.findByPk(id);
  console.log(user);
  const photo = user.photo;
  console.log(photo);
  res.json({ photo, displayname });
};

const pullMainContent = async (req, res) => {
  const { displayname, username, id } = req.session.user;

  console.log(req.session.user);

  const posts = await Post.findAll({
    order: [["createdAt", "desc"]],
    include: [
      {
        model: Comment,
        attributes: ["content", "createdAt", "id"],
        include: User,
      },
      // {
      //   model: Tag_To_Post,
      //   include: Tag,
      // },
      // {
      //   model: Vote,
      // },
    ],
  });

  for (let p of posts) {
    p.User = await User.findByPk(p.userid);
    p.Game = await Game.findByPk(p.gameid);
  }

  res.json({
    displayname,
    id,
    posts,
  });
};

const getProfilePosts = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findAll({
    where: {
      userid: id,
    },
    order: [["createdAt", "desc"]],
    include: [
      {
        model: Comment,
        attributes: ["content", "createdAt", "id"],
        include: User,
      },
    ],
  });

  for (let p of posts) {
    p.User = await User.findByPk(p.userid);
    p.Game = await Game.findByPk(p.gameid);
  }
  console.log(posts);
  res.json(posts);
};

const getFollowers = async (req, res) => {
  const { id } = req.session.user;

  const followers = await Follower.findAll({
    where: {
      followeeid: id,
    },
    // include: User,
  });

  const following = await Follower.findAll({
    where: {
      followerid: id,
    },
    // include: User,
  });

  res.json({
    message: "Sending Followers",
    followers,
    following,
    id,
  });
};

const getProfileFollows = async (req, res) => {
  const { id } = req.params;

  const followers = await Follower.findAll({
    where: {
      followeeid: id,
    },
    // include: User, // Error: [SequelizeEagerLoadingError]: User is not associated to Follower!
  });

  const following = await Follower.findAll({
    where: {
      followerid: id,
    },
    // include: User, // Error: [SequelizeEagerLoadingError]: User is not associated to Follower!
  });

  res.json({
    message: "Sending Profile Followers",
    followers,
    following,
    id,
  });
};

const saveFollowers = async (req, res) => {
  const { id } = req.params;
  const convertedInt = Number(id);
  const sessionid = req.session.user.id;

  if (convertedInt === sessionid) {
    res.json({ Error: "You are Trying to Follow Yourself. You can't do that" });
  } else {
    const createFollower = await Follower.create({
      followeeid: convertedInt,
      followerid: sessionid,
    });

    const savedFollower = await User.findByPk(createFollower.followeeid);

    res.json({ "Now Following": savedFollower.displayname });
  }
};

const getAllGames = async (req, res) => {
  const getallgames = await Game.findAll({
    attributes: ["title", "id"],
  });
  res.json({ message: "All Games", getallgames });
};

const grabMainTopFive = async (req, res) => {
  // const grabMainTopFive = await Game.findAll({
  //   attributes: [
  //     "id",
  //     [
  //       sequelize.fn("count", sequelize.col("Game_Junctions.gameid")),
  //       "gamecount",
  //     ],
  //   ],
  //   include: [{ attributes: [], model: Game_Junction }],
  //   group: ["Game.id"],
  // });
  const [grabMainTopFive] = await Game_Junction.top(5)
  res.json(grabMainTopFive);
};

const saveTopFive = async (req, res) => {
  const { id } = req.body;
  const sessionid = req.session.user.id;

  const saveTopFive = await Game_Junction.create({
    gameid: id,
    userid: sessionid,
  });

  res.json("Created Game Entry");
};

const personalTopFive = async (req, res) => {
  const { id } = req.params;
  const topFive = await Game_Junction.findAll({
    where: {
      userid: id,
    },
    include: Game,
    //     attributes: [

    //     include: Game,
    //     order: ,
    // ]
  });

  res.json({ message: "Sending Personal Top Five", topFive });
};

const game = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findByPk(id);
  console.log(game);

  res.json(game);
  // res.render("game-page", {
  //   locals: {
  //     game,
  //   },
  //   ...layout,
  // });
};

module.exports = {
  processNewUser,
  addImageToNewUser,
  getMainPhoto,
  processLogin,
  processLogout,
  pullMainContent,
  getFollowers,
  getProfileFollows,
  saveFollowers,
  getAllGames,
  grabMainTopFive,
  saveTopFive,
  personalTopFive,
  getProfilePosts,
  processPost,
  editPost,
  processEditPost,
  processPostImage,
  game,
};
