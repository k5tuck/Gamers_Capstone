const { layout } = require('../utils')
const bcrypt = require("bcryptjs");
const { User } = require('../models');
const { Op } = require("sequelize");

const newUser = (req, res) => {
    res.render("signUpPage", {
        locals: {},
        ...layout,
    });
};

const processNewUser = async (req, res) => {
    const { password, name, email, displayname } = req.body;
    let { username } = req.body;
    if (username == "" || password == "") {
      // res.json(["Username or Password is Blank!"]);
      res.redirect("/errorsignup");
    } else {
      const hash = bcrypt.hashSync(password, 10); // auto salt!
      try {
        const dbUsername = username.toLowerCase();
  
        const newUser = await User.create({
          username: dbUsername,
          hash,
          name,
          email,
          displayname,
        });
        console.log(newUser);
  
        res.redirect("/user/login");
      } catch (e) {
        console.log(e)
        //res.send("username is taken");
        if (e == "SequelizeUniqueConstraintError") {
          console.log("Username is Taken. Try Again!");
          // res.json(["Username is Taken. Try Again!"]);
          res.redirect("/takensignup");
        }
        res.redirect("/takensignup");
      }
    }
};

const login = (req, res) => {
    res.render("loginPage", {
      locals: {},
      ...layout,
    });
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
          // username
          id: user.id,
          // id
          displayname: user.displayname,
        };
        req.session.save(() => {
          res.redirect("/members");
          // res.send('that is totally right!');
        });
      } else {
        res.send("boooo wrong password!");
      }
    } else {
      res.send("No user with that name!");
    }
    //   res.render("loginPage", {
    //     locals: {},
    //   });
    // res.redirect('/members')
};



module.exports = {
    newUser,
    processNewUser,
    login,
    processLogin
};