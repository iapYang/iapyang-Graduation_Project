/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = {
    // isLoggedIn: function(req, res, next) {
    //     var targetFolderId = req.param('id');
    //     var userId = req.session.user.id;

    //     Permission
    //         .findOneByFolderId(targetFolderId)
    //         .exec(function foundPermission(err, permission) {

    //             if (err) return next(err);

    //             if (!permission) return res.redirect('/');

    //             next();
    //         });
    // }
};