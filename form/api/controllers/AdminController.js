/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var moment = require('moment');
var bcrypt = require('bcrypt');

module.exports = {
    //view ejs
    viewAdminList: function(req, res) {
        return res.view("admin/adminList", {
            // admin: admin
        });
    },
    viewAdminInf: function(req, res) {
        return res.view("admin/adminInf", {
            // admin: admin
        });
    },
    viewSetting: function(req, res) {
        var admin = req.session.admin[0];
        return res.view("admin/setting", {
            admin: admin
        });
    },


    <!-- /// 我只是分割线 /// -->
    signIn: function(req, res) {
        var name = req.param('name');

        if(name == undefined){
            name = '';
        }
        return res.view('admin/login', {
            name: name
        });
    },

    checkUN: function(req, res) {
        var name = req.param('name');

        Admin.find({
            name: name
        }).exec(function findOneCB(err, admins) {
            if (err) {
                console.log('err:'+err);
            }
            if(admins.length == 0){
                return res.json({
                  data: '该用户名不存在',
                  state: 122
                });
            }else {
                return res.json({
                  data: 'name exist',
                  state: 222
                });
            }
        });
    },

    check: function(req, res) {
        var name = req.param('name');
        var password = req.param('password');
        var isAdmin = false;
        var isSuperAdmin = false;

        Admin.find({
            name: name
        }).exec(function findOneCB(err, admins) {
            if (err) {
                console.log('err:'+err);
            }
            if(admins.length == 0){
                res.json({
                  data: '该用户不存在',
                  state: 122
                });
                return res.forbidden();
            }else {
                bcrypt.compare(password, admins[0].password, function(err, bres) {
                    if(bres == true){
                        req.session.admin = admins;
                        if(admins[0].isAdmin == 1) isAdmin = true;
                        if(admins[0].isSuperAdmin == 1) isSuperAdmin = true;
                        res.json({
                          data: 'login success',
                          isAdmin: isAdmin,
                          isSuperAdmin: isSuperAdmin,
                          state: 444
                        });
                        return res.forbidden();
                    }else {
                        res.json({
                          data: '密码错误',
                          state: 344
                        });
                        return res.forbidden();
                    }
                });
            }
        });
    },

    checkEM: function(req, res) {
        var email = req.param('email');

        Admin.find({
            email: email
        }).exec(function findOneCB(err, admins) {
            if (err) {
                console.log('err:'+err);
            }
            if(admins.length == 0){
                return res.json({
                  data: '该邮箱可以使用',
                  state: 555
                });
            }else {
                return res.json({
                  data: '该邮箱已被使用过',
                  state: 677
                });
            }
        });
    },

    signUp: function(req, res) {
        var name = req.param('name');
        var password = req.param('password');
        var email = req.param('email');

        Admin.create({
            name: name,
            password: password,
            email: email
        }).exec(function(err, created) {
            if (err) {
                console.log('err:'+err);
                return res.json({
                  data: '注册失败',
                  state: 788
                });
            }
            return res.json({
              data: '注册成功',
              state: 777
            });
        });
    },

    logOut: function (req,res) {
        req.session.destroy(function(err) {
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
	},





    adminList: function(req, res) {
        var admin = req.session.admin[0];
        var index = req.allParams().index;
        var pageSize = 10;
        if(index == undefined){
            index = 1;
        }
        //,sort: 'name DESC/ASC'
        Admin.find({ isSuperAdmin: { '!': '1' }}).paginate({
            page: index,
            limit: pageSize
        }).exec(function findOneCB(err, admins) {
            if (err) {
                console.log('err1:' + err);
            }
            Admin.count().exec(function countCB(err, number) {
                if (err) {
                    console.log('err2:' + err);
                }
                for (var i = 0; i < admins.length; i++) {
                    admins[i].createdAt = moment(admins[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
                }
                return res.view("admin/adminList", {
                    users: admins,
                    number: number / pageSize,
                    index:  index,
                    admin: admin
                });
            });
        });
    },

    delAdmin: function(req, res) {
        var uid = req.allParams().id;
        var admin = req.session.admin[0];
        Admin.destroy({
            id: uid
        }).exec(function (err){
            if (err) {
                console.log('err');
            }
            sails.log('The records for troublesome admin ('+uid+') has been deleted, if they still existed.');
            res.redirect('/admin/adminList');
        });
    },

    adminInf: function(req, res) {
        var admin = req.session.admin[0];
        var uid = req.allParams().id;

        Admin.find({
            id: uid
        }).exec(function findOneCB(err, admins) {
            if (err) {
                console.log('err');
            }
            return res.view("admin/adminInf", {
                users: admins,
                admin: admin
            });
        });
    },

    modAdmin: function(req, res) {
        var admin = req.session.admin[0];
        var uid = req.param('id');
        var name = req.param('name');
        var isAdmin = req.param('isAdmin');
        var isSuperAdmin = req.param('isSuperAdmin');
        var email = req.param('email');

        Admin.update({
            id: uid},{
                // name: name,
                // isSuperAdmin: isSuperAdmin,
                // email: email,
                isAdmin: isAdmin
        }).exec(function afterwards(err, updated){
            if (err) {
                console.log(err);
                return;
            }
            sails.log('Updated admin');
            res.redirect('/admin/adminInf');
        });
    }
};
