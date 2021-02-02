const { layout } = require('../utils');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { User, Comment, Post, Game } = require("../models");
const UPLOAD_URL = "/uploads/media/";

const member = async (req, res) => {
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
        //   model: Game,
        //   attributes: ["title", "createdAt"],
        // }
      ]
    });
  
    for (let p of posts) {
      p.User = await User.findByPk(p.userid);
      p.Game = await Game.findByPk(p.gameid)
    }
  
    res.render("members", {
      locals: {
        displayname,
        username,
        posts,
        id,
      },
      ...layout,
    });
};

const profile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
  
    console.log("Error Before FindAll");
    const member = await Post.findAll({
      where: {
        userid: id,
      },
      order: [["createdAt", "desc"]],
      include: [
        {
          model: Comment,
          attributes: ["content", "createdAt"],
          include: User,
        },
        // {
        //   model: User,
        // },
      ],
    });
    for (let p of member) {
      p.User = await User.findByPk(p.userid);
      p.Game = await Game.findByPk(p.gameid)
    }
    console.log(JSON.stringify(member, null, 4));
    res.render("profile", {
      locals: {
        member,
        user,
        id: req.session.user.id
      },
      ...layout,
    });
  }

const createPost = async(req, res) => {
    const games = await Game.findAll()
    res.render("createForm", {
      locals: {
        games
      },
      ...layout,
    });
  };

const processPost = async (req, res) => {
    const { id, username } = req.session.user;
    const { file } = req;
    const { title, content, gameid } = req.body;
    let mediaPic = file ? UPLOAD_URL + file.filename : "";
    const post = await Post.create({
      userid: id,
      username,
      title,
      media: mediaPic,
      content,
      gameid
    });
    res.redirect("/members");
};

const editPost= async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    const games = await Game.findAll()
    res.render("createFormEdit", {
      locals: {
        post,
        games
      },
      ...layout,
    });
  }

const processEditPost= async (req, res) => {
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

    res.redirect("/members");
}

const createComment= async (req, res) => {
    const { id } = req.params;
  
    const post = await Post.findByPk(id);
    const users = await User.findAll({
      order: [["name", "asc"]],
    });
  
    res.render("add-comment", {
      locals: {
        post,
        users,
      },
      ...layout,
    });
  }

  const processComment= async (req, res) => {
    const post = req.params.id;
    const { content } = req.body;
    const { id } = req.session.user;
  
    const comment = await Comment.create({
      content,
      userid: id,
      postid: post,
    });
    res.redirect("/members");
  }

const editComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  const post = await Post.findByPk(comment.postid);
  const user = await User.findByPk(comment.userid);
  res.render("editComment", {
    locals: {
      comment,
      post,
      user,
    },
    ...layout,
  });
};

const processEditComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const updatedComment = await Comment.update(
    {
      content,
    },
    {
      where: {
        id,
        userid: req.session.user.id,
      },
    }
  );

  res.redirect("/members");
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  res.render("delete-post", {
    locals: {
      name: "Delete Post",
      post,
    },
    ...layout,
  });
};

const processDeletePost= async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.destroy({
    where: {
      id,
      userid: req.session.user.id,
    },
  });
  res.redirect("/members");
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  res.render("deleteComment", {
    locals: {
      comment,
    },
    ...layout,
  });
};

const processDeleteComment = async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Comment.destroy({
    where: {
      id,
      userid: req.session.user.id,
    },
  });
  res.redirect("/members");
};

const search = (req, res) => {
  res.render("search", {
    locals: {},
    ...layout,
  });
};

const processSearch= async (req, res) => {
  const { searchContent } = req.body;
  const { id } = req.session.user;

  try {
    if (searchContent) {
      const posts = await Post.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("title") /*Sequelize.col("content")*/
          ),
          {
            [Op.iLike]: "%" + searchContent + "%",
          }
        ),

        include: [
          {
            model: Comment,
            attributes: ["content", "createdAt"],
            include: User,
          },
        ],
      });
      for (let p of posts) {
        p.User = await User.findByPk(p.userid);
        p.Game = await Game.findByPk(p.gameid)
      }
      console.log(posts)
      res.render("search-results", {
        locals: {
          posts,
          id
        },
        ...layout,
      });
    }
  } catch (err) {
    console.log(`SEARCH ERROR : ${err}`);
    res.redirect("/members");
  }
};

const ProcessGameSearch= async (req, res) => {
  const { searchStuff } = req.body;
  const { id } = req.session.user;

  try {
    if (searchStuff) {
      const game = await Game.findOne({
        where: Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("title") /*Sequelize.col("content")*/
          ),
          {
            [Op.iLike]: "%" + searchStuff + "%",
          }
        ),
      });
      let gid = game.id;
      const posts = await Post.findAll({
        where: {
          gameid: gid,
        },
        include: [
          {
            model: Comment,
            attributes: ["content", "createdAt"],
            include: User,
          },
        ],
      })
      for (let p of posts) {
        p.User = await User.findByPk(p.userid);
        p.Game = await Game.findByPk(p.gameid)
      }
      res.render("search-results", {
        locals: {
          posts,
          id
        },
        ...layout,
      });
    }
  } catch (err) {
    console.log(`SEARCH ERROR : ${err}`);
    res.redirect("/members");
  }
};

const game = async (req,res)=>{
  const { id } = req.params;
  const game = await Game.findByPk(id);
  console.log(game.image)
  res.render('game-page', {
      locals: {
          game
      },
      ...layout
  })
};



const about = (req, res) => {
    res.render("members-about", {
      locals: {},
      ...layout,
    });
};

const contact = (req, res) => {
    res.render("members-contact", {
      locals: {},
      ...layout,
    });
};


const logout = (req, res) => {
    console.log('logging out...');
    req.session.destroy(() => {
        // After deleting session:
        res.redirect('/');
    });
};
module.exports = {
    member,
    profile,
    createPost,
    processPost,
    editPost,
    processEditPost,
    deletePost,
    processDeletePost,
    createComment,
    processComment,
    editComment,
    processEditComment,
    deleteComment,
    processDeleteComment,
    search,
    processSearch,
    ProcessGameSearch,
    game,
    about,
    contact,
    logout
}