
const User = require("../models/User");

const getHomePage = async (req, res) => {
    let result = await User.find({});

    res.send(result)
}

module.exports = {
    getHomePage,

}