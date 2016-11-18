module.exports = function (req, res, next) {
    if (!req.session.admin) {
        return res.send("you are not loggedIn!");
    }
    if (req.session.admin[0].isAdmin != '1') {
        return res.send("you are not admin!");
    }
    next();
};