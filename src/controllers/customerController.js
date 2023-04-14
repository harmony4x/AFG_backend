
const { userValidate } = require('../middleware/validation');
const { createCustomerService, createArrayCustomerService, getAllCustomersService, updateACustomerService, deleteACustomerService, deleteArrayCustomerService, isExits } = require('../services/customerService');
const { uploadSingleFile } = require('../services/fileService');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { uploadFile } = require('../models/upload');

module.exports = {
    createCustomerUser: async (req, res, next) => {

        try {
            let { email } = req.body;
            let { error } = userValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            const checkEmail = await isExits(email);

            if (checkEmail !== null) {
                throw createError.Conflict(`${email} is already registered`);
            }

            let uploadImage = '';
            if (!req.files || Object.keys(req.files).length === 0) {

            } else {
                file = req.files.image;
                let result = await uploadSingleFile(file);
                uploadImage = result.path;
            }
            const image = await uploadFile({ shared: true }, uploadImage)
            let customerData = { ...req.body, image }

            let customer = await createCustomerService(customerData);
            if (customer) {
                return res.status(200).json({
                    errorCode: 0,
                    data: customer,
                    msg: "Sucessfully created customer"
                })
            }

        } catch (error) {
            res.json({
                errorCode: -1,
                msg: error
            })
        }

    },
    createArrayUser: async (req, res) => {
        let data = req.body.customers;

        let result = await createArrayCustomerService(data);
        if (result) {
            return res.status(200).json({
                errorCode: 0,
                data: result

            })
        } else {
            return res.status(200).json({
                errorCode: -1,
                data: null
            })
        }
    },
    getAllCustomers: async (req, res) => {
        try {
            result = await getAllCustomersService(req.query);

            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        } catch (error) {
            return res.status(200).json({
                errorCode: 0,
                data: error
            })
        }


    },
    updateACustomer: async (req, res) => {
        try {
            let data = req.body;
            let result = await updateACustomerService(data);
            return res.status(200).json({
                errorCode: 0,
                data: result

            })
        } catch (error) {
            return res.status(200).json({
                errorCode: -1,
                data: error

            })
        }
    },
    deleteACustomer: async (req, res) => {
        try {
            let { _id } = req.body;
            let result = await deleteACustomerService(_id);
            return res.status(200).json({
                errorCode: 0,
                data: result
            })
        } catch (error) {
            return res.status(200).json({
                errorCode: -1,
                data: error
            })
        }
    },
    deleteArrayCustomer: async (req, res) => {
        let data_id = req.body._id;
        let result = await deleteArrayCustomerService(data_id);
        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    }
}