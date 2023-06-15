'use strict';

const { SucessResponse } = require("../core/sucess.response");
const NotificationService = require("../services/notificationService");



class CommentController {
    createNotification = async (data) => {
        new SucessResponse({
            message: 'Create new nontification successfully!',
            metadata: await NotificationService.createNotification({
                ...data,

            })
        })
    }

    findNotificationByPost = async (req, res, next) => {
        new SucessResponse({
            message: 'Find nontification by user successfully!',
            metadata: await NotificationService.findNotificationByUserId(req.params.userId)
        }).send(res)
    }

}

module.exports = new CommentController()