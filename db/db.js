// Require mongoose
const mongoose = require('mongoose');
const user = require('../api/model/user');

const findUser = async (object) => {
    return await userInfo.find(object);
};

const saveUser = async (newUser) => {
    return newUser.save();
};

module.exports = { findUser, saveUser };