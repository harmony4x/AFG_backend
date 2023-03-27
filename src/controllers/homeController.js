const User = require("../models/user");

const getHomePage = (req, res) => {
    res.render('sample.ejs')
}

const createUser = async (req, res) => {
    let { name } = req.body;
    await User.create({
        name,
    })
    res.send(name);
}

const getAllUser = async (req, res) => {
    let result = await User.find({});

    res.send(result)
}

module.exports = {
    getHomePage,
    createUser,
    getAllUser,
}