const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');


const seriesSchema = new mongoose.Schema(
    {

        title: String,
        slug: String,
        description: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },

    },
    {
        timestamps: true,
    }
);

seriesSchema.plugin(mongoose_delete, { overrideMethods: 'all' });



const Series = mongoose.model('series', seriesSchema);

module.exports = Series;