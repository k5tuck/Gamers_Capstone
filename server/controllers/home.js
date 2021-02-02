const { layout } = require('../utils')

const home = (req, res) => {
res.render("home", {
    locals: {},
    ...layout,
});
};


const about = (req, res) => {
res.render("about", {
    locals: {},
    ...layout,
});
};

const contact = (req, res) => {
res.render("contact", {
    locals: {},
    ...layout,
});
}

const unauthorized = (req, res) => {
    res.render("unauthorized", {
      ...layout,
    });
}
const errorsignup = (req, res) => {
    res.render("errorSignUp", {
      locals: {
        error: "Username or Password is Blank!",
      },
      ...layout,
    });
};

const taken = (req, res) => {
    res.render("takenSignUp", {
      locals: {
        error: "Username Is Taken. Try Again!",
      },
      ...layout,
    });
};

module.exports = {
    home,
    about,
    contact,
    unauthorized,
    errorsignup,
    taken
}