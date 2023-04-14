const aqp = require('api-query-params');
const Role = require('../models/role');
const createError = require('http-errors');

module.exports = {
    createRoleService: async (data) => {
        try {
            let name = data.name;
            let checkName = Role.find({ name });

            let role = new Role({
                ...data
            })

            let res = await role.save();
            return res
        } catch (error) {
            return error;
        }
    },
    getAllRoleService: async (limit, page, queryString) => {
        try {
            let result = null;
            if (limit && page) {
                let { filter } = aqp(queryString)
                delete filter.page

                offset = (page - 1) * limit;
                result = await Role.find(filter).skip(offset).limit(limit).exec();
            } else {
                result = await Role.find({});
            }
            return result;
        } catch (error) {
            return error;
        }
    },
    updateARoleService: async (data) => {
        try {

            let res = await Role.updateOne(
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
    },
    deleteARoleService: async (_id) => {
        try {
            let result = await Role.deleteById({ _id });
            console.log(result);
            return result;
        } catch (error) {

            return error;
        }
    }
}