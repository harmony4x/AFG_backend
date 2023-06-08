'use strict';

const { Types } = require("mongoose");
const postModel = require("../post.model");
const aqp = require('api-query-params');

const updatePost = async (postId, slug, bodyUpdate, isNew = true, image) => {

    if (image) {
        const findPost = await postModel.findById({ _id: postId })
        return await findPost.update({ ...bodyUpdate, slug, image })
    } else {
        const findPost = await postModel.findById({ _id: postId })
        return await findPost.update({ ...bodyUpdate, slug })

        // return await postModel.findOneAndUpdate({ _id: postId }, bodyUpdate, {
        //     new: isNew,
        // })
    }


}


const findAllPosts = async (queryString) => {

    let result = null;
    let { filter, limit, sort } = aqp(queryString)
    let { page, population } = filter;

    if (limit && page) {
        delete filter.page
        delete filter.population
        const offset = (page - 1) * limit;
        if (sort.new === 1) {
            result = await postModel.find(filter).skip(offset).limit(limit).populate(population).sort({ updateAt: -1 }).exec();

        } else if (sort.hot === 1) {
            result = await postModel.find(filter).skip(offset).limit(limit).populate(population).sort({ view: -1 }).exec();
        } else if (sort.vote === 1) {
            result = await postModel.find(filter).skip(offset).limit(limit).populate(population).sort({ vote: -1 }).exec();
        }



    } else {
        result = await postModel.find({}).populate(population).sort({ updateAt: -1 }).exec();

    }
    return result;
}

const findPostBySlug = async (slug) => {
    return await postModel
        .findOne({ slug })
        .populate('user')
        .populate('category')
        .populate('series')
        .exec()
}


const findPostByUserId = async (userId) => {
    return await postModel
        .find({ user: new Types.ObjectId(userId) })
        .populate('user')
        .populate('category')
        .populate('series')
        .exec()
}


module.exports = {
    updatePost,
    findAllPosts,
    findPostBySlug,
    findPostByUserId
}