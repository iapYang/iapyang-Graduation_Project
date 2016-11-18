/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  connection: 'mysql',
  tableName: 'Admin',
  attributes: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    // 是否管理员（默认为非管理员）
    isAdmin: {
      type: 'string',
      defaultsTo: '0'
    },
    // 是否超级管理员（默认为非超级管理员）
    isSuperAdmin: {
      type: 'string',
      defaultsTo: '0'
    },
    createdAt: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },
    updatedAt: {
      type: 'datetime',
      defaultsTo: function (){ return new Date(); }
    },
  },
  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (admin, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(admin.password, salt, function(err, hash) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            admin.password = hash;
            cb();
        }
      });
    });
  }
};
