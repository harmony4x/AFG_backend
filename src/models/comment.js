'use strict';

const { mongoose, Schema, model, Types } = require('mongoose'); // Erase if already required

const slugify = require('slugify')
const crypto = require('crypto');
const mongoose_delete = require('mongoose-delete');


const DOCUMENT_NAME = 'comment'
const COLLECTION_NAME = 'comments'
// Declare the Schema of the Mongo model
const commentSchema = new Schema({

    content: { type: String, required: true },
    parrentComment: { type: Schema.Types.ObjectId, ref: 'comment', default: null },
    user: { type: Schema.Types.ObjectId, ref: 'customer' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    });


commentSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

//Export the model
module.exports = model(DOCUMENT_NAME, commentSchema);