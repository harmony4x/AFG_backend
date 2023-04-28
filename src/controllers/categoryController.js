const createError = require('http-errors');
const { categoryValidate } = require('../middleware/validation');
const { createCategoryService, isExits, getAllCategoryService, updateACategoryService, deleteACategoryService } = require('../services/categoryService');
const create_slug = require('slug')
const crypto = require('crypto');




module.exports = {
    createCategory: async (req, res, next) => {
        try {
            let slug2 = create_slug(req.body.title) + '-' + crypto.randomBytes(4).toString('hex')

            let { title } = req.body;

            let { error } = categoryValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            const checkTitle = await isExits(slug2);

            if (checkTitle !== null) {
                throw createError.Conflict(`${title} is already exists`);
            }

            let category = await createCategoryService(title, slug2);
            if (category) {
                return res.status(200).json({
                    errorCode: 0,
                    data: category,
                    msg: "Sucessfully created category"
                })
            }

        } catch (error) {
            res.json({
                errorCode: -1,
                msg: error
            })
        }

    },
    getAllCategory: async (req, res) => {
        try {
            result = await getAllCategoryService(req.query);

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
    updateACategory: async (req, res) => {
        try {
            let { _id, title } = req.body

            let slug2 = create_slug(req.body.title) + '-' + crypto.randomBytes(4).toString('hex')

            let result = await updateACategoryService(_id, title, slug2);
            return res.status(200).json({
                errorCode: 0,
                data: result,
                msg: "Sucessfully update category"

            })
        } catch (error) {
            return res.status(200).json({
                errorCode: -1,
                data: error

            })
        }
    },
    deleteACategory: async (req, res) => {
        try {
            let { _id } = req.body;
            let result = await deleteACategoryService(_id);
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