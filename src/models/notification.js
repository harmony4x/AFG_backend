'use strict';

const { mongoose, Schema, model, Types } = require('mongoose'); // Erase if already required


const mongoose_delete = require('mongoose-delete');


const DOCUMENT_NAME = 'notification'
const COLLECTION_NAME = 'notifications'
// Declare the Schema of the Mongo model
const notifySchema = new Schema({

    content: { type: String, required: true },
    userReceiver: { type: Schema.Types.ObjectId, ref: 'customer' },
    userSend: { type: Schema.Types.ObjectId, ref: 'customer' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    isSeen: { type: Boolean, default: false },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    });


notifySchema.plugin(mongoose_delete, { overrideMethods: 'all' });

//Export the model
module.exports = model(DOCUMENT_NAME, notifySchema);