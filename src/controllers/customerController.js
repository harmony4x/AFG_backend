
const { userValidate } = require('../middleware/validation');
const {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomersService,
    updateACustomerService,
    deleteACustomerService,
    deleteArrayCustomerService,
    isExits,
    getACustomerService,
    getACustomerByEmailService } = require('../services/customerService');
const { uploadSingleFile } = require('../services/fileService');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { uploadFile } = require('../models/upload');
const cloudinary = require('cloudinary').v2;

module.exports = {
    createCustomerUser: async (req, res, next) => {

        try {
            let { email } = req.body;
            let fileData = req.file

            let phone = '';
            let birthday = new Date();
            let { error } = userValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            const checkEmail = await isExits(email);

            if (checkEmail !== null) {
                throw createError.Conflict(`${email} is already registered`);
            }
            let image = 'https://res.cloudinary.com/ddvhpz8hw/image/upload/v1682315730/AFG_uploads/nwhywznashlqrng6jc6w.png'

            let customerData = { ...req.body, image, phone, birthday }

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
    getACustomers: async (req, res) => {
        try {

            let _id = req.body;
            result = await getACustomerService(_id);

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

    getACustomerByEmail: async (req, res) => {
        try {

            let { email } = req.params;
            result = await getACustomerByEmailService(email, select = ['_id', 'name', 'email', 'image']);

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
            let defaultImage = 'https://res.cloudinary.com/ddvhpz8hw/image/upload/v1682315730/AFG_uploads/nwhywznashlqrng6jc6w.png'
            let fileData = req.file
            let image = fileData?.path

            let { name, email, address, phone, role, gender, password, _id, birthday, oldImage } = req.body;

            let data = {
                name, email, address, phone, role, gender, password, _id, image, birthday
            }

            let result = await updateACustomerService(data);
            return res.status(200).json({
                errorCode: 0,
                data: result

            })
        } catch (error) {
            let fileData = req.file
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
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