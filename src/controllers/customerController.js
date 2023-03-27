
const { createCustomerService, createArrayCustomerService, getAllCustomersService, updateACustomerService, deleteACustomerService } = require('../services/customerService');
const { uploadSingleFile } = require('../services/fileService');

module.exports = {
    createCustomerUser: async (req, res) => {
        if (req.body.customers = true && Array.isArray(req.body.customers)) {
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
        } else {


            let { name, email, address, phone, description } = req.body;
            let imageUrl = '';
            if (!req.files || Object.keys(req.files).length === 0) {

            } else {
                file = req.files.image;
                let result = await uploadSingleFile(file);
                imageUrl = result.path;
            }
            let customerData = {
                name, email, address, phone, description, imageUrl
            }

            let customer = await createCustomerService(customerData);
            if (customer) {
                return res.status(200).json({
                    errorCode: 0,
                    data: customer
                })
            } else {
                return res.status(200).json({
                    errorCode: -1,
                    data: ""
                })
            }
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
        let result = await getAllCustomersService();
        return res.status(200).json({
            errorCode: 0,
            data: result
        })

    },
    updateACustomer: async (req, res) => {
        let { name, email, address, phone, description, _id } = req.body;
        let data = {
            name, email, address, phone, description, _id
        }
        let result = await updateACustomerService(data);
        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    },
    deleteACustomer: async (req, res) => {
        let _id = req.body.id;
        let result = await deleteACustomerService(_id);
        return res.status(200).json({
            errorCode: 0,
            data: result
        })
    }
}