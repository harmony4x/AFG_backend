const aqp = require('api-query-params');
const Series = require('../models/series');


const isExits = async (slug) => {
    const checkTitle = await Series.findOne({ slug });

    return checkTitle;
}

const createSeriesService = async (title, slug, description) => {
    try {
        console.log(title, slug, description);
        let series = new Series({
            title,
            slug,
            description
        })
        let res = await series.save();
        return res
    } catch (error) {
        return error;
    }

}

const getAllSeriesService = async (queryString) => {
    try {

        let result = null;
        let { filter, limit } = aqp(queryString)
        let { page } = filter;
        if (limit && page) {
            delete filter.page
            offset = (page - 1) * limit;
            result = await Series.find(filter).skip(offset).limit(limit).sort({ _id: -1 }).exec();
        } else {

            result = await Series.find({}).sort({ _id: -1 }).exec();

        }
        return result;
    } catch (error) {

        return error;
    }
}

const updateASeriesService = async (_id, title, slug, description) => {
    try {

        let res = await Series.updateOne(
            {
                _id
            },
            {
                title,
                slug,
                description
            }
        )
        return res;
    } catch (error) {

        return error;
    }
}

const deleteASeriesService = async (_id) => {
    try {
        let result = await Series.deleteById(_id);
        return result;
    } catch (error) {

        return error;
    }
}

module.exports = {
    isExits,
    createSeriesService,
    getAllSeriesService,
    updateASeriesService,
    deleteASeriesService

}