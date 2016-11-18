/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'AdminController.signIn',

  'GET /admin/login': 'AdminController.signIn',
  '/register': {view: 'admin/register',locals: {layout: null}},
  '/logOut': 'AdminController.logOut',

  'POST /admin/check': 'AdminController.check',
  'POST /admin/signUp': 'AdminController.signUp',
  // 'POST /admin/adminList': {view: 'admin/adminList',locals: {layout: null}},
  // 'POST /admin/adminInf': {view: 'admin/adminInf',locals: {layout: null}},
  'POST /admin/modAdmin': 'AdminController.modAdmin',
  '/setting': 'AdminController.viewSetting',


  // '/addUser': {view: 'user/addUser',locals: {layout: null}},
  // 'POST /user/userList': {view: 'user/userList',locals: {layout: null}},
  // 'POST /user/userInf': {view: 'user/userInf',locals: {layout: null}},
  // '/user/waiting': {view: 'user/waiting',locals: {layout: null}}

  //use controller
  'POST /admin/adminList': 'AdminController.viewAdminList',
  'POST /admin/adminInf': 'AdminController.viewAdminInf',

  '/addUser': 'UserController.viewAddUser',
  'POST /user/addUser': 'UserController.addUser',
  'POST /user/userList': 'UserController.viewUserList',
  'POST /user/userInf': 'UserController.viewUserInf',
  '/user/waiting': 'UserController.viewWaiting'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
