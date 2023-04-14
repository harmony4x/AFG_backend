const aqp = require('api-query-params');
const Category = require('../models/category');

const isExits = async (title) => {
    const checkTitle = await Category.findOne({ title });

    return checkTitle;
}

const createCategoryService = async (categoryData) => {
    try {

        let category = new Category({
            ...categoryData
        })
        let res = await category.save();
        return res
    } catch (error) {
        return error;
    }

}

const getAllCategoryService = async (queryString) => {
    try {

        let result = null;
        let { filter, limit } = aqp(queryString)
        if (limit && page) {
            delete filter.page
            offset = (page - 1) * limit;
            result = await Category.find(filter).skip(offset).limit(limit).exec();
        } else {
            console.log("1")
            result = await Category.find({}).exec();

        }
        return result;
    } catch (error) {

        return error;
    }
}

const updateACategoryService = async (data) => {
    try {

        let res = await Category.updateOne(
            {
                ...data._id
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

const deleteACategoryService = async (_id) => {
    try {
        let result = await Category.deleteById(_id);
        return result;
    } catch (error) {

        return error;
    }
}

module.exports = {
    isExits,
    createCategoryService,
    getAllCategoryService,
    updateACategoryService,
    deleteACategoryService

}