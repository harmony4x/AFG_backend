'use strict';


const { BadRequestError } = require('../core/error.response')
const { removeUndefinedObject, updateNestedObjectParse } = require('../utils/index');
const { updatePost, findAllPosts, findPostBySlug, findPostByUserId } = require("../models/repo/post.repo");
const postModel = require("../models/post.model");
const { postValidate } = require('../middleware/validation');
const slugify = require('slugify')
const crypto = require('crypto');
class PostService {
    constructor({
        title, slug, thumb,
        description, content, user,
        series, category, attributes
    }) {
        this.title = title
        this.slug = slug
        this.thumb = thumb
        this.description = description
        this.content = content
        this.user = user
        this.series = series
        this.category = category
        this.attributes = attributes
    }

    static async createPost(payload) {

        let image = payload?.fileData?.path
        if (!image) throw new BadRequestError('image error')

        const newPost = await postModel.create({
            ...payload,
            image
        })
        if (!newPost) {
            throw new BadRequestError('create new post error')
        }

        return newPost
    }

    static async updatePost(data) {
        const postId = data.postId

        let image = data?.fileData?.path

        const title = data?.title
        const slug = slugify(title, { lower: true }) + '-' + crypto.randomBytes(4).toString('hex')

        const objectParams = removeUndefinedObject(data)

        const update = await updatePost(postId, slug, updateNestedObjectParse(objectParams), image)

        return update

    }

    static async deletePost(postId) {
        const _id = postId
        const deletePost = await postModel.deleteById(_id)
        return deletePost
    }

    // static async getAllPosts() {
    //     const allPosts = await postModel.find();
    // }

    static async findAllPosts(data) {

        return await findAllPosts(data)
    }

    static async findPostsBySlug(slug) {

        return await findPostBySlug(slug)
    }

    static async findPostByUserId(userId) {

        return await findPostByUserId(userId)
    }
}

module.exports = PostService
