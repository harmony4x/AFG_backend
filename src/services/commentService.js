'use strict';


const { BadRequestError } = require('../core/error.response');
const comment = require('../models/comment');
const { updateComment, findCommentByPostId } = require('../models/repo/comment.repo');
const { removeUndefinedObject, updateNestedObjectParse, removeUndefinedObjectV2 } = require('../utils/index');
class CommentService {
    constructor({
        content, parrentComment, user,
        post
    }) {
        this.content = content
        this.parrentComment = parrentComment
        this.user = user
        this.post = post
    }

    static async createComment(data) {
        const newData = removeUndefinedObjectV2(data)
        console.log('check newData', newData)
        const newComment = await comment.create({
            ...newData,

        })
        if (!newComment) {
            throw new BadRequestError('create new comment error')
        }

        return newComment
    }

    static async updateComment(data) {
        const _id = data._id
        const update = await updateComment(_id, data)

        return update

    }

    static async deleteComment(_id) {

        const deleteComment = await comment.deleteById(_id)
        if (deleteComment) {
            await comment.deleteMany({ parrentComment: _id })
        }
        return deleteComment
    }

    static async findCommentByPostId(postId) {

        return await findCommentByPostId(postId)
    }

}

module.exports = CommentService
