const Joi = require('joi');

const userValidate = (data) => {
    const user = Joi.object({
        name: Joi.string()
            .min(3)
            .max(15)
            .required(),

        email: Joi.string()
            .email()
            .min(5)
            .max(30)
            .pattern(new RegExp('gmail.com'))
            .lowercase()
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        role: Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
        gender: Joi.number(),

    })
    return user.validate(data);
}



const loginValidate = (data) => {
    const user = Joi.object({

        email: Joi.string()
            .email()
            .min(5)
            .max(30)
            .pattern(new RegExp('gmail.com'))
            .lowercase()
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),


    })
    return user.validate(data);
}

const roleValidate = (data) => {
    const role = Joi.object({

        name: Joi.string()
            .min(3)
            .max(30)
            .lowercase()
            .required(),
    })
    return role.validate(data);
}

const categoryValidate = (data) => {
    const category = Joi.object({

        title: Joi.string()
            .min(3)
            .max(30)
            .required(),

    })
    return category.validate(data);
}

const seriesValidate = (data) => {
    const series = Joi.object({

        title: Joi.string()
            .min(3)
            .max(30)
            .required(),
        description: Joi.string()
            .min(3)
            .max(30),
        userId: Joi.string()
    })
    return series.validate(data);
}



module.exports = {
    userValidate,
    loginValidate,
    roleValidate,
    categoryValidate,
    seriesValidate
}