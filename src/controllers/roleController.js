const createError = require('http-errors');
const { userValidate, roleValidate } = require('../middleware/validation');
const { createRoleService, getAllRoleService, updateARoleService, deleteARoleService } = require('../services/roleService');

module.exports = {
    createRole: async (req, res, next) => {
        try {
            let name = req.body.name;
            let { error } = roleValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            let roleData = { ...req.body }

            let role = await createRoleService(roleData);

            if (role) {
                return res.status(200).json({
                    errorCode: 0,
                    data: role,
                    msg: "Sucessfully created role"
                })
            }

        } catch (error) {
            res.json({
                errorCode: -1,
                msg: error
            })
        }

    },
    getAllRole: async (req, res) => {
        try {
            let { limit, page } = req.query

            let result = null;
            if (limit && page) {
                result = await getAllRoleService(limit, page, req.query);
            } else {
                result = await getAllRoleService();
            }

            return res.status(200).json({
                errorCode: 0,
                data: result,
                msg: "Sucessfully update role"

            })
        } catch (error) {
            return res.status(200).json({
                errorCode: 0,
                data: error
            })
        }

    },
    updateARole: async (req, res) => {
        try {
            let data = req.body;

            let result = await updateARoleService(data);
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
    deleteARole: async (req, res) => {
        try {
            let { _id } = req.body;

            let result = await deleteARoleService(_id);
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
}