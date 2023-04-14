const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');


const categorySchema = new mongoose.Schema(
    {

        title: String,
        slug: String,
        description: String,

    },
    {
        timestamps: true,
    }
);

categorySchema.plugin(mongoose_delete, { overrideMethods: 'all' });



const Category = mongoose.model('category', categorySchema);

module.exports = Category;