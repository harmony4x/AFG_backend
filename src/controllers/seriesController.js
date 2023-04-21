const createError = require('http-errors');
const { seriesValidate } = require('../middleware/validation');

const create_slug = require('slug');
const { isExits, createSeriesService, getAllSeriesService, updateASeriesService, deleteASeriesService } = require('../services/seriesService');

const crypto = require('crypto');



module.exports = {
    createSeries: async (req, res, next) => {
        try {

            let slug2 = create_slug(req.body.title) + '-' + crypto.randomBytes(4).toString('hex')

            let { title, description } = req.body;


            let { error } = seriesValidate(req.body);

            if (error) {
                throw createError(error.details[0].message)
            }

            const checkTitle = await isExits(slug2);

            if (checkTitle !== null) {
                throw createError.Conflict(`${title} is already exists`);
            }

            let series = await createSeriesService(title, slug2, description);
            if (series) {
                return res.status(200).json({
                    errorCode: 0,
                    data: series,
                    msg: "Sucessfully created series"
                })
            }

        } catch (error) {
            res.json({
                errorCode: -1,
                msg: error
            })
        }

    },
    getAllSeries: async (req, res) => {
        try {
            result = await getAllSeriesService(req.query);

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
    updateASeries: async (req, res) => {
        try {
            let { _id, title, description } = req.body

            let slug2 = create_slug(req.body.title) + '-' + crypto.randomBytes(4).toString('hex')



            let result = await updateASeriesService(_id, title, slug2, description);

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
    deleteASeries: async (req, res) => {
        try {
            let { _id } = req.body;
            let result = await deleteASeriesService(_id);
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