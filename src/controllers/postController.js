'use strict';

const { SucessResponse } = require("../core/sucess.response");
const PostService = require("../services/postService");

class PostController {
    createPost = async (req, res, next) => {
        new SucessResponse({
            message: 'Create new post successfully!',
            metadata: await PostService.createPost({
                ...req.body,
                fileData: req.file
            })
        }).send(res)
    }

    updatePost = async (req, res, next) => {
        new SucessResponse({
            message: 'Update post successfully!',
            metadata: await PostService.updatePost(req.body)
        }).send(res)
    }

    deletePost = async (req, res, next) => {
        new SucessResponse({
            message: 'Delete post successfully!',
            metadata: await PostService.deletePost(req.body.postId)
        }).send(res)
    }

    findAllPost = async (req, res, next) => {
        new SucessResponse({
            message: 'Find All Post successfully!',
            metadata: await PostService.findAllPosts(req.query)
        }).send(res)
    }

    findPostBySlug = async (req, res, next) => {
        new SucessResponse({
            message: 'Find Post By Slug successfully!',
            metadata: await PostService.findPostsBySlug(req.params.slug)
        }).send(res)
    }

    findPostByUser = async (req, res, next) => {
        new SucessResponse({
            message: 'Find Post By User successfully!',
            metadata: await PostService.findPostByUserId(req.params.userId)
        }).send(res)
    }

    // getAllPost = async (req, res, next) => {
    //     new SucessResponse({
    //         message: 'Delete post successfully!',
    //         metadata: await PostService.updatePost(req.body.postId)
    //     }).send(res)
    // }
}

module.exports = new PostController()