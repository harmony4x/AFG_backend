const Customer = require("../models/customer");

const isExits = async (email) => {
    const checkEmail = await Customer.findOne({ email });
    return checkEmail;
}

const registerService = async (data) => {
    try {
        let role = '643e544f55efd99c53cf6691'
        let { email, password, name } = data;
        let user = await new Customer({
            email,
            password,
            name,
            role,
            address: '',
            gender: 0,
            image: '',
            phone: '',
        });
        let res = user.save();
        return res;
    } catch (error) {
        return error;
    }
}

const loginService = async (email) => {
    let user = await Customer.findOne({ email }).populate('role').exec();

    return user;
}

module.exports = {
    isExits,
    registerService,
    loginService
}