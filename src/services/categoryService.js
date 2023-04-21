const aqp = require('api-query-params');
const Category = require('../models/category');

const isExits = async (slug) => {
    const checkTitle = await Category.findOne({ slug });

    return checkTitle;
}

const createCategoryService = async (title, slug) => {
    try {

        let category = new Category({
            title,
            slug
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
        let { page } = filter;
        if (limit && page) {
            delete filter.page
            offset = (page - 1) * limit;
            result = await Category.find(filter).skip(offset).limit(limit).sort({ _id: -1 }).exec();
        } else {
            result = await Category.find({}).sort({ _id: -1 }).exec();

        }
        return result;
    } catch (error) {

        return error;
    }
}

const updateACategoryService = async (_id, title, slug) => {
    try {

        let res = await Category.updateOne(
            {
                _id
            },
            {
                title,
                slug
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