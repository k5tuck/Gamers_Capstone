const { layout } = require('../utils')

const blank = (req, res) => {
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
    taken,
    blank
}