const createError = require('http-errors');
const { categoryValidate } = require('../middleware/validation');
const { createCategoryService, isExits, getAllCategoryService, updateACategoryService, deleteACategoryService } = require('../services/categoryService');


module.exports = {
    createCategory: async (req, res, next) => {
        try {
            let { title, slug } = req.body;

            let { error } = categoryValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            const checkTitle = await isExits(title);

            if (checkTitle !== null) {
                throw createError.Conflict(`${title} is already exists`);
            }


            let categoryData = { ...req.body }

            let category = await createCategoryService(categoryData);
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
            let data = req.body;
            let result = await updateACategoryService(data);
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