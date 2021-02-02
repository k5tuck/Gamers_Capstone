const { layout } = require("../utils");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Op } = require("sequelize");

// Signup Template

// const newUser = (req, res) => {
//   res.render("signUpPage", {
//     locals: {},
//     ...layout,
//   });
// };

const processNewUser = async (req, res) => {
  const { password, name, email, displayname } = req.body;
  let { username } = req.body;
  if (username == "" || password == "") {
    // res.redirect("/errorsignup");
    res.json("Username or Password is Blank!");
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

      // res.redirect("/user/login");
      res.json("User Successfully Created");
    } catch (e) {
      console.log(e);
      if (e == "SequelizeUniqueConstraintError") {
        console.log("Username is Taken. Try Again!");
        // res.redirect("/takensignup");
        res.json("Username is Taken. Try Again!");
      }
      // Previously -  Redirected User to Signup Page stating Username was taken
      // res.redirect("/takensignup");
    }
  }
};

// Login Template

// const login = (req, res) => {
//   res.render("loginPage", {
//     locals: {},
//     ...layout,
//   });
// };

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

module.exports = {
  newUser,
  processNewUser,
  login,
  processLogin,
};
