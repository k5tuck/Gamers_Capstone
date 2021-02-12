const { layout } = require("../utils");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const UPLOAD_URL = "/uploads/media/";
const UPLOAD_URL_DEFAULT = "/images/GPIcon.png";

const { Op, json } = require("sequelize");
const {
  User,
  Comment,
  Post,
  Game,
  Follower,
  Game_Junction,
  Tag,
  TagToPost,
  Like,
} = require("../models");
const { default: axios } = require("axios");

const processPostImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req;

  console.log("=========================================================");
  console.log(file);
  console.log("=========================================================");

  const post = await Post.findOne({
    where: {
      id,
    },
  });
  let mediaPic = file ? UPLOAD_URL + file.filename : post.media;
  let mediaType = file ? file.mimetype : post.mediatype;
  post.media = mediaPic;
  post.mediatype = mediaType;

  await post.save();
  res.json({ post, file });
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, { include: TagToPost });
  const game = await Game.findByPk(post.gameid);

  res.json({ post, game });
};

const processEditPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, gameid, tagname } = req.body;

  let data = {
    title,
    gameid,
    content,
  };

  const updatedPost = await Post.update(data, {
    where: {
      id,
      userid: req.session.user.id,
    },
  });

  const tagstopost = await TagToPost.findOne({
    postid: updatedPost.id,
  });

  const tag = await Tag.findOne({
    id: tagstopost.tagid,
  });

  tag.tagname = tagname;
  await tag.save();

  res.json("Edited Post succesfully");
};

const processNewUser = async (req, res) => {
  console.log(req.body);
  const { password, name, email, displayname, games } = req.body;
  let { username } = req.body;

  if (username == "" || password == "") {
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
    }
  }
};

const addImageToNewUser = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log(file);
  let mediaPic = file ? UPLOAD_URL + file.filename : UPLOAD_URL_DEFAULT;
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
    const isValid = bcrypt.compareSync(password, user.hash);
    if (isValid) {
      req.session.user = {
        username: user.username,
        id: user.id,
        displayname: user.displayname,
      };
      req.session.save(() => {
        res.json({
          message: "Session Saved",
          status: true,
          sessionid: user.id,
        });
      });
    } else {
      res.json({ message: "Wrong password! Try Again", status: false });
    }
  } else {
    res.json({ message: "User Does Not Exist", status: false });
  }
};

const processLogout = (req, res) => {
  console.log("Logging Out");
  req.session.destroy(() => {
    res.json("Session Destroyed");
  });
};

const getMainPhoto = async (req, res) => {
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id, displayname } = req.session.user;
    const user = await User.findByPk(id);
    console.log(user);
    const photo = user.photo;
    console.log(photo);
    res.json({ photo, displayname: user.displayname });
  }
};

const getTag = async (req, res) => {
  const { search } = req.body;

  const sessionid = req.session.user.id;
  console.log(search);

  const tag = await Tag.findAll({
    where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("tagname")), {
      [Op.iLike]: "%" + search + "%",
    }),
  });

  if (tag !== null) {
    const posts = await TagToPost.findAll({
      where: {
        tagid: tag.map((t) => t.id),
      },
      include: [
        {
          model: Post,
          order: [["createdAt", "desc"]],
          include: [
            {
              model: Like,
            },
            {
              model: TagToPost,
              attributes: ["tagid"],
              include: Tag,
            },
            {
              model: Game,
              attributes: ["title"],
            },
            {
              model: Comment,
              attributes: ["content", "createdAt", "id"],
              include: User,
            },
          ],
        },
      ],
    });

    res.json({ posts, sessionid });
  } else {
    res.json("Tag Does Not Exist");
  }
};

const makeTag = async (req, res) => {
  const { id } = req.params;
  const { tagname } = req.body;

  // Checking to See If Tag Exist
  const tagNameExist = await Tag.findOne({
    where: {
      tagname,
    },
  });

  console.log("====================================");
  console.log(tagNameExist);
  console.log("====================================");

  // Need Conditional Check Here

  if (!tagNameExist) {
    // If tag does Not exist - Create It
    const tag = await Tag.create({
      tagname,
    });
    const tagstopost = await TagToPost.create({
      tagid: tag.id,
      postid: id,
    });
  } else {
    const tagstopost = await TagToPost.create({
      tagid: tagNameExist.id,
      postid: id,
    });
  }

  // Link TagID to PostId to Make Relationship
  res.json(tagname);
};

const makeLike = async (req, res) => {
  const { id } = req.params;
  const sessionid = req.session.user.id;
  const { like } = req.body;

  const createdLike = await Like.create({
    userid: sessionid,
    postid: id,
    like,
  });

  res.json(createdLike);
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  const sessionid = req.session.user.id;

  const deletedLike = await Like.destroy({
    where: {
      [Op.and]: [
        {
          postid: id,
          userid: sessionid,
        },
      ],
    },
  });

  res.json(deletedLike);
};

const processPost = async (req, res) => {
  const { id, username } = req.session.user;
  const { title, content, gameid } = req.body;

  const user = await User.findByPk(id);

  const post = await Post.create({
    userid: id,
    username,
    title,
    content,
    gameid,
    userphoto: user.photo,
  });

  const game = await Game_Junction.create({
    gameid,
    userid: id,
  });

  res.json({ post, game });
};

const getProfilePagePic = async (req, res) => {
  const { id } = req.session.user;
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const photo = user.photo;
    const displayname = user.displayname;
    res.json({ photo, displayname, id });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  // console.log("====================================");
  // console.log(req.body);
  // console.log(req.file);
  // console.log("====================================");
  const { displayname } = req.body;
  const { file } = req;

  // console.log("====================================");
  // console.log(displayname);
  // console.log(file);
  // console.log("====================================");

  // const updatedProfile = await User.update(
  //   { displayname },
  //   {
  //     where: {
  //       id,
  //     },
  //   }
  // );

  const user = await User.findOne({
    where: {
      id,
    },
  });
  let name = displayname ? (user.displayname = displayname) : user.displayname;
  user.displayname = name;
  let mediaPic = file ? UPLOAD_URL + file.filename : user.photo;
  user.photo = mediaPic;

  await user.save();

  res.status(200).json({ displayname: user.displayname, photo: user.photo });
};

const updateProfilePic = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log("====================================");
  console.log(file);
  console.log("====================================");

  const user = await User.findOne({
    where: {
      id,
    },
  });

  let mediaPic = file ? UPLOAD_URL + file.filename : user.photo;
  user.photo = mediaPic;
  await user.save();

  res.json(user.photo);
};

const pullMainContent = async (req, res) => {
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { displayname, username, id } = req.session.user;
    console.log(req.session.user);

    const posts = await Post.findAll({
      order: [["createdAt", "desc"]],
      include: [
        // {
        //   model: User,
        //   attributes: ["displayname"],
        // },
        {
          model: Like,
        },
        {
          model: TagToPost,
          attributes: ["tagid"],
          include: Tag,
        },
        {
          model: Game,
          attributes: ["title"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt", "id"],
          include: User,
        },
      ],
    });

    // for (let post of posts) {
    //   let user = await User.findByPk(post.userid);
    //   post.User.photo =
    //     user.photo !== undefined
    //       ? user.photo
    //       : "/uploads/media/23c7334a3e632c4be951f9d941919f38";
    // }

    res.json({
      sessionid: id,
      posts,
    });
  }
};

const getGamePosts = async (req, res) => {
  const { id } = req.params;
  const sessionid = req.session.user.id;
  const posts = await Post.findAll({
    where: {
      gameid: id,
    },
    order: [["createdAt", "desc"]],
    include: [
      {
        model: Like,
      },
      {
        model: TagToPost,
        attributes: ["tagid"],
        include: Tag,
      },
      {
        model: Game,
        attributes: ["title"],
      },
      {
        model: Comment,
        attributes: ["content", "createdAt", "id"],
        include: User,
      },
    ],
  });

  console.log(posts);
  res.json({
    posts,
    sessionid,
  });
};

const getProfilePosts = async (req, res) => {
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id } = req.params;
    const posts = await Post.findAll({
      where: {
        userid: id,
      },
      order: [["createdAt", "desc"]],
      include: [
        {
          model: Like,
        },
        {
          model: TagToPost,
          attributes: ["tagid"],
          include: Tag,
        },
        {
          model: Game,
          attributes: ["title"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt", "id"],
          include: User,
        },
      ],
    });
    // console.log(posts);
    res.json(posts);
  }
};

const processDeletePost = async (req, res) => {
  const { id } = req.params;

  const destroyedtag = await TagToPost.destroy({
    where: {
      postid: id,
    },
  });

  const destroyedlike = await Like.destroy({
    where: {
      postid: id,
    },
  });
  const destroyedcomment = await Comment.destroy({
    where: {
      postid: id,
    },
  });
  const dpost = await Post.destroy({
    where: {
      id,
    },
  });
  res.json("Post Deleted");
};

const getComment = async (req, res) => {
  const { id } = req.params;

  const getComment = await Comment.findByPk(id);

  res.json(getComment);
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const sessionid = req.session.user.id;

  const addedComment = await Comment.create({
    postid: id,
    content,
    userid: sessionid,
  });

  res.json("Comment Created");
};

const editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const sessionid = req.session.user.id;

  const editedComment = await Comment.update(
    { content: content },
    {
      where: {
        id,
      },
    }
  );

  res.json({ message: "Comment Edited", editedComment });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const sessionid = req.session.user.id;

  const deletedComment = await Comment.destroy({
    where: {
      id,
      userid: sessionid,
    },
  });

  res.json("Comment Deleted");
};

const getFollowers = async (req, res) => {
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id } = req.session.user;

    const [following] = await Follower.following(id);

    const [followers] = await Follower.followers(id);

    res.json({
      message: "Sending Followers",
      followers,
      following,
      id,
    });
  }
};

const getProfileFollows = async (req, res) => {
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id } = req.params;
    const sessionid = req.session.user.id;

    const [following] = await Follower.following(id);

    const [followers] = await Follower.followers(id);

    res.json({
      message: "Sending Profile Followers",
      followers,
      following,
      sessionid,
      id,
    });
  }
};

const saveFollower = async (req, res) => {
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

const removeFollower = async (req, res) => {
  const { id } = req.params;
  const convertedInt = Number(id);
  const sessionid = req.session.user.id;

  const removeFollower = await Follower.destroy({
    where: {
      followeeid: convertedInt,
      followerid: sessionid,
    },
  });
  const removedFollower = await User.findByPk(convertedInt);

  res.json({ Unfollowed: removedFollower.displayname });
};

const getAllGames = async (req, res) => {
  const getallgames = await Game.findAll({
    attributes: ["title", "id"],
  });
  res.json({ message: "All Games", getallgames });
};

const grabMainTopFive = async (req, res) => {
  const [grabMainTopFive] = await Game_Junction.top(10);
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
  if (!req.session.user) {
    res.json("User is Not Logged In");
  } else {
    const { id } = req.params;
    const cInt = Number(id);

    const [grabPersonalTopFive] = await Game_Junction.personaltop(cInt, 5);
    const user = await User.findByPk(id);

    res.json({
      message: "Sending Personal Top Five",
      grabPersonalTopFive,
      displayname: user.displayname,
    });
  }
};

const searchPost = async (req, res) => {
  const { search } = req.body;
  const { id } = req.session.user;

  try {
    if (search) {
      const searchedposts = await Post.findAll({
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("title")), {
          [Op.iLike]: "%" + search + "%",
        }),
      });
      console.log(searchedposts);

      const postids = [];
      for (let p of searchedposts) {
        postids.push(p.id);
      }

      const posts = await Post.findAll({
        where: {
          id: postids,
          // [Op.or]: [{ id: postids[0] }],
        },
        order: [["createdAt", "desc"]],
        include: [
          {
            model: Like,
          },
          {
            model: TagToPost,
            attributes: ["tagid"],
            include: Tag,
          },
          {
            model: Game,
            attributes: ["title"],
          },
          {
            model: Comment,
            attributes: ["content", "createdAt", "id"],
            include: User,
          },
        ],
      });
      res.json({ posts, id });
    }
  } catch (err) {
    console.log(`SEARCH ERROR : ${err}`);
    res.json(`SEARCH ERROR`);
  }
};

const searchGame = async (req, res) => {
  const { search } = req.body;
  const { id } = req.session.user;

  try {
    if (search) {
      const game = await Game.findOne({
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("title")), {
          [Op.iLike]: "%" + search + "%",
        }),
      });
      let gid = game.id;
      const posts = await Post.findAll({
        where: {
          gameid: gid,
        },
        order: [["createdAt", "desc"]],
        include: [
          {
            model: Like,
          },
          {
            model: TagToPost,
            attributes: ["tagid"],
            include: Tag,
          },
          {
            model: Game,
            attributes: ["title"],
          },
          {
            model: Comment,
            attributes: ["content", "createdAt", "id"],
            include: User,
          },
        ],
      });

      console.log(posts);
      res.json({ posts, id });
    }
  } catch (err) {
    console.log(`SEARCH ERROR : ${err}`);
    res.json(`SEARCH ERROR`);
  }
};

const game = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findByPk(id);
  console.log(game);

  res.json(game);
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
  saveFollower,
  removeFollower,
  getAllGames,
  grabMainTopFive,
  saveTopFive,
  personalTopFive,
  getGamePosts,
  getProfilePosts,
  processPost,
  editPost,
  processEditPost,
  processDeletePost,
  getComment,
  addComment,
  editComment,
  deleteComment,
  getTag,
  makeTag,
  makeLike,
  deleteLike,
  processPostImage,
  game,
  getProfilePagePic,
  updateProfile,
  updateProfilePic,
  searchPost,
  searchGame,
};
