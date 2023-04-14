
const User = require("../models/user");
const { uploadSingleFile, uploadMultipleFile } = require("../services/fileService");

const getHomePage = async (req, res) => {
    let payload = req.payload.role;
    console.log(payload);
    return res.status(200).json(
        {
            errorCode: 0,
            data: payload
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

const uploadSingle = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    file = req.files.image;
    let result = await uploadSingleFile(file)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}

const uploadMultipleAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    file = req.files.image;

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFile(file)

        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    } else {
        let result = await uploadSingleFile(file)

        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    }

}

module.exports = {
    getHomePage, createUser, updateUser, deleteUser, uploadSingle, uploadMultipleAPI

}