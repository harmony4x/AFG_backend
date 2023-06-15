'use strict';

const { Types } = require("mongoose");
const commentModel = require("../../models/comment")


const updateComment = async (_id, data, isNew = true) => {

    return await commentModel.findByIdAndUpdate(_id, data, {
        new: isNew,
    })

}
const findCommentByPostId = async (postId) => {
    return await commentModel
        .find({ post: new Types.ObjectId(postId) })
        .populate('user')
        .populate('parrentComment')
        .exec()
}


module.exports = {
    updateComment,
    findCommentByPostId
}