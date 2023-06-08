'use strict';

const { mongoose, Schema, model } = require('mongoose'); // Erase if already required

const slugify = require('slugify')
const crypto = require('crypto');
const mongoose_delete = require('mongoose-delete');


const DOCUMENT_NAME = 'Post'
const COLLECTION_NAME = 'Posts'
// Declare the Schema of the Mongo model
const postSchema = new Schema({
    title: { type: String, required: true },
    slug: String,
    image: { type: String, required: true },
    description: String,
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'customer' },
    series: { type: Schema.Types.ObjectId, ref: 'series' },
    category: { type: Schema.Types.ObjectId, ref: 'category' },

    view: {
        type: Number,
        default: 0,

    },
    vote: {
        type: Number,
        default: 0,

    },


    //more
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be above 5.0'],
        // 4.3432123 => 4.3
        set: (val) => Math.floor(val * 10) / 10
    },

    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false }

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    });


postSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true }) + '-' + crypto.randomBytes(4).toString('hex')
    next()
})





postSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

//Export the model
module.exports = model(DOCUMENT_NAME, postSchema);