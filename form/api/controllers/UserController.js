/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var service = require("../services/add");
var moment = require('moment');

module.exports = {
    //view ejs
    viewAddUser: function(req, res) {
        // var admin = req.session.admin[0];
        // if(admin == undefined){
        //     admin = '';
        // }
        return res.view("user/addUser", {
            // admin: admin
        });
    },
    viewUserList: function(req, res) {
        return res.view("user/userList", {
            // admin: admin
        });
    },
    viewUserInf: function(req, res) {
        return res.view("user/userInf", {
            // admin: admin
        });
    },
    viewWaiting: function(req, res) {
        return res.view("user/waiting", {
            // admin: admin
        });
    },

    <!-- /// 我只是分割线 /// -->
    addUser: function(req, res) {
        var name = req.param('name');
        var sex = req.param('sex');
        var birthDay = req.param('birthDay');
        var workAge = req.param('workAge');
        var lastSalary = req.param('lastSalary');
        var nationality = req.param('nationality');
        var residence = req.param('residence');
        var email = req.param('email');
        var phone = req.param('phone');
        var idNu = req.param('idNu');
        var nowAddress = req.param('nowAddress');
        var positionApply = req.param('positionApply');
        var exceptSalary = req.param('exceptSalary');
        var startDate = req.param('startDate');
        var registeredAdd = req.param('registeredAdd');
        var school_from = req.param('school_from');
        var school_to = req.param('school_to');
        var major = req.param('major');
        var school = req.param('school');
        var diploma = req.param('diploma');
        var cet = req.param('cet');
        var work_from = req.param('work_from');
        var work_to = req.param('work_to');
        var salary = req.param('salary');
        var company = req.param('company');
        var position = req.param('position');
        var address = req.param('address');
        var recommender = req.param('recommender');
        var reason = req.param('reason');
        var work_from2 = req.param('work_from2');
        var work_to2 = req.param('work_to2');
        var salary2 = req.param('salary2');
        var company2 = req.param('company2');
        var position2 = req.param('position2');
        var address2 = req.param('address2');
        var recommender2 = req.param('recommender2');
        var reason2 = req.param('reason2');
        var skill1 = req.param('skill1');
        var skill2 = req.param('skill2');
        var skill3 = req.param('skill3');
        var skill4 = req.param('skill4');
        var knowRoute = req.param('knowRoute');
        var detail = req.param('detail');

        User.create({
            name: name,
            sex: sex,
            birthDay: birthDay,
            workAge: workAge,
            lastSalary: lastSalary,
            nationality: nationality,
            residence: residence,
            email: email,
            phone: phone,
            idNu: idNu,
            nowAddress: nowAddress,
            positionApply: positionApply,
            exceptSalary: exceptSalary,
            startDate: startDate,
            registeredAdd: registeredAdd,
            school_from: school_from,
            school_to: school_to,
            major: major,
            school: school,
            diploma: diploma,
            cet: cet,
            work_from: work_from,
            work_to: work_to,
            salary: salary,
            company: company,
            position: position,
            address: address,
            recommender: recommender,
            reason: reason,
            work_from2: work_from2,
            work_to2: work_to2,
            salary2: salary2,
            company2: company2,
            position2: position2,
            address2: address2,
            recommender2: recommender2,
            reason2: reason2,
            skill1: skill1,
            skill2: skill2,
            skill3: skill3,
            skill4: skill4,
            knowRoute: knowRoute,
            detail: detail
        }).exec(function(error, created) {
            if(error){
                console.log(error);
                return res.json({
                  data: '添加失败',
                  state: 555
                });
            }
            sails.log('The user '+name+' has bee added');
            return res.json({
              data: '添加成功',
              state: 666
            });
        });
    },

    userList: function(req, res) {
        var admin = req.session.admin[0];
        var index = req.allParams().index;
        var pageSize = 10;
        if(index == undefined){
            index = 1;
        }
        User.find().paginate({
            page: index,
            limit: pageSize
        }).exec(function findOneCB(err, users) {
            if (err) {
                console.log('err1:' + err);
            }
            User.count().exec(function countCB(err, number) {
                if (err) {
                    console.log('err2:' + err);
                    return;
                }
                for (var i = 0; i < users.length; i++) {
                    users[i].createdAt = moment(users[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
                }
                return res.view("user/userList", {
                    users: users,
                    number: number / pageSize,
                    index:  index,
                    admin: admin
                });
            });
        });
    },

    userInf: function(req, res) {
        var admin = req.session.admin[0];
        var uid = req.allParams().id;
        User.find({
            id: uid
        }).exec(function findOneCB(err, users) {
            if (err) {
                console.log('err');
                return;
            }
            for (var i = 0; i < users.length; i++) {
                users[i].startDate = moment(users[i].startDate).format('YYYY-MM-DD');
                users[i].school_from = moment(users[i].school_from).format('YYYY-MM-DD');
                users[i].school_to = moment(users[i].school_to).format('YYYY-MM-DD');
                users[i].work_from = moment(users[i].work_from).format('YYYY-MM-DD');
                users[i].work_to = moment(users[i].work_to).format('YYYY-MM-DD');
                users[i].work_from2 = moment(users[i].work_from2).format('YYYY-MM-DD');
                users[i].work_to2 = moment(users[i].work_to2).format('YYYY-MM-DD');
            }
            return res.view("user/userInf", {
                users: users,
                admin: admin
            });
        });
    },

    delUser: function(req, res) {
        var uid = req.allParams().id;
        var admin = req.session.admin[0];
        User.destroy({
            id: uid
        }).exec(function (err){
            if (err) {
                console.log('err');
                return;
            }
            sails.log('The records for troublesome users ('+uid+') have been deleted, if they still existed.');
            res.redirect('/user/userList');
        });
    }
};
