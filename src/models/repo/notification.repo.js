'use strict';

const { Types } = require("mongoose");
const notifycationModel = require("../../models/notification")


const updateNotification = async (_id, data, isNew = true) => {

    return await notifycationModel.findByIdAndUpdate(_id, data, {
        new: isNew,
    })

}
const findNotificationByUserId = async (userId) => {
    return await notifycationModel
        .find({ userId: new Types.ObjectId(userId) })
        .exec()
}


module.exports = {
    updateNotification,
    findNotificationByUserId
}