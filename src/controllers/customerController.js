
const { createCustomerService, createArrayCustomerService } = require('../services/customerService');
const { uploadSingleFile } = require('../services/fileService');

module.exports = {
    createCustomerUser: async (req, res) => {
        let { name, email, adress, phone, description } = req.body;
        let imageUrl = '';
        if (!req.files || Object.keys(req.files).length === 0) {

        } else {
            file = req.files.image;
            let result = await uploadSingleFile(file);
            imageUrl = result.path;
        }
        let customerData = {
            name, email, adress, phone, description, imageUrl
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
    }
}