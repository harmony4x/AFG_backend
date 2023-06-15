'use strict';

const { SucessResponse } = require("../core/sucess.response");
const CommentService = require("../services/commentService");


class CommentController {
    createComment = async (req, res, next) => {

        return new SucessResponse({
            message: 'Create new comment successfully!',
            metadata: await CommentService.createComment({
                ...req.body

            })
        }).send(res)
    }

    createCommentWithSocketIO = async (data) => {

        return new SucessResponse({
            message: 'Create new comment successfully!',
            metadata: await CommentService.createComment({
                ...data,

            })
        })
    }

    updateComment = async (req, res, next) => {
        new SucessResponse({
            message: 'Create new comment successfully!',
            metadata: await CommentService.updateComment({
                ...req.body

            })
        }).send(res)
    }

    findCommentByPost = async (req, res, next) => {
        new SucessResponse({
            message: 'Find comment by post successfully!',
            metadata: await CommentService.findCommentByPostId(req.params.postId)
        }).send(res)
    }
    DeleteCommentByPost = async (req, res, next) => {
        new SucessResponse({
            message: 'Delete comment by post successfully!',
            metadata: await CommentService.deleteComment(req.body._id)
        }).send(res)
    }

}

module.exports = new CommentController()