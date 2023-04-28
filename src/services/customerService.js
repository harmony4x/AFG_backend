const Customer = require('../models/customer');
const aqp = require('api-query-params');


const isExits = async (email) => {
    const checkEmail = await Customer.findOne({ email });
    return checkEmail;
}

const createCustomerService = async (customerData) => {
    try {
        let user = new Customer({
            ...customerData
        })

        let res = await user.save();
        return res
    } catch (error) {
        return error;
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

const getAllCustomersService = async (queryString) => {
    try {

        let result = null;
        let { filter, limit } = aqp(queryString)
        let { page, population } = filter;

        if (limit && page) {
            delete filter.page
            delete filter.population
            offset = (page - 1) * limit;
            result = await Customer.find(filter).skip(offset).limit(limit).populate(population).sort({ _id: -1 }).exec();


        } else {
            result = await Customer.find({}).populate(population).sort({ _id: -1 }).exec();

        }
        return result;
    } catch (error) {

        return error;
    }
}

const getACustomerService = async (_id) => {
    try {
        let population = 'role'
        let result = await Customer.find({ _id }).populate(population).exec();
        return result;

    } catch (error) {
        return error;

    }
}

const updateACustomerService = async (data) => {
    try {
        let { name, email, address, phone, role, gender, password, _id, image } = data;

        let res = await Customer.updateOne(
            {
                _id
            },
            {
                ...data
            }
        )
        return res;

    } catch (error) {

        return error;
    }
}

const deleteACustomerService = async (_id) => {
    try {
        let result = await Customer.deleteById(_id);
        return result;
    } catch (error) {

        return error;
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
    isExits,
    getACustomerService,
}