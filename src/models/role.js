const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const roleSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

roleSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Role = mongoose.model('role', roleSchema);

module.exports = Role;