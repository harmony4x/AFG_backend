
const User = require("../models/User");

const getHomePage = async (req, res) => {
    let result = await User.find({});

    return res.status(200).json(
        {
            errorCode: 0,
            data: result
        }
    )
}

const createUser = async (req, res) => {
    let { name, email, city } = req.body
    let result = await User.create({
        name,
        email,
        city,

    });
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}

const updateUser = async (req, res) => {
    let { name, email, city, _id } = req.body
    let result = await User.updateOne(
        {
            _id
        },
        {
            name,
            email,
            city,

        });
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}

const deleteUser = async (req, res) => {
    let _id = res.body;
    let result = await User.deleteOne(_id);
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}

module.exports = {
    getHomePage, createUser, updateUser, deleteUser

}