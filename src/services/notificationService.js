'use strict';


const { BadRequestError } = require('../core/error.response');
const notifycationModel = require("../models/notification");
const { findNotificationByUserId } = require('../models/repo/notification.repo');


class NotificationService {
    constructor({
        content, user
    }) {
        this.content = content

        this.user = user

    }

    static async createNotification(data) {
        const { senderName, senderId, receiverId, postTitle, postSlug, postId } = data;
        const content = `${senderName} đã bình luận về bài viết ${postTitle}`
        const userReceiver = receiverId
        const userSend = senderId
        const post = postId
        const newNotification = await notifycationModel.create({
            content,
            userReceiver,
            userSend,
            post

        })
        if (!newNotification) {
            throw new BadRequestError('create new notification error')
        }

        return newNotification
    }


    static async findNotificationByUserId(userId) {

        return await findNotificationByUserId(userId)
    }

}

module.exports = NotificationService
