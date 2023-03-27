const Customer = require('../models/customer');

const createCustomerService = async (customerData) => {
    let { name, email, adress, phone, description, imageUrl } = customerData;

    try {
        let res = await Customer.create({
            name,
            email,
            adress,
            phone,
            description,
            image: imageUrl
        })
        return res
    } catch (error) {
        return null;
    }

}

module.exports = {
    createCustomerService,

}