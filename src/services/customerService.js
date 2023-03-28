const Customer = require('../models/customer');

const createCustomerService = async (customerData) => {
    let { name, email, address, phone, description, imageUrl } = customerData;

    try {
        let res = await Customer.create({
            name,
            email,
            address,
            phone,
            description,
            image: imageUrl
        })
        return res
    } catch (error) {
        console.log(error);
        return null;
    }

}

const createArrayCustomerService = (data) => {
    let customers = data;
    try {
        let res = Customer.insertMany(customers);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomersService = async (limit, page) => {
    try {
        let result = null;
        if (limit && page) {
            offset = (page - 1) * limit;
            result = await Customer.find({}).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateACustomerService = async (data) => {
    try {
        let { name, email, address, phone, description, _id } = data;
        let res = await Customer.updateOne(
            {
                _id
            },
            {
                name, email, address, phone, description
            }
        )
        return res;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteACustomerService = async (_id) => {
    try {
        let result = await Customer.deleteById(_id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteArrayCustomerService = async (data_id) => {
    try {
        let result = await Customer.delete({ _id: { $in: data_id } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomersService,
    updateACustomerService,
    deleteACustomerService,
    deleteArrayCustomerService,
}