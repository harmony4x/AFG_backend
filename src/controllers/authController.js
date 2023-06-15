
const createError = require('http-errors');
const { userValidate, loginValidate } = require('../middleware/validation');
const { isExits } = require('../services/customerService');
const { registerService, loginService } = require('../services/authService');
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../middleware/jwtService');
const client = require('../config/redis');


module.exports = {
    register: async (req, res, next) => {
        try {
            let { email } = req.body;
            let { error } = userValidate(req.body);
            if (error) {
                throw createError(error.details[0].message)
            }

            const checkEmail = await isExits(email);

            if (checkEmail !== null) {
                throw createError.Conflict(`${email} is already registered`);
            }
            let image = 'https://res.cloudinary.com/ddvhpz8hw/image/upload/v1682315730/AFG_uploads/nwhywznashlqrng6jc6w.png'

            let customerData = { ...req.body, image }

            let customer = await registerService(customerData);
            if (customer) {
                return res.status(200).json({
                    errorCode: 0,
                    data: customer,
                    msg: "Sucessfully register user"
                })
            }
        } catch (error) {
            return res.json({
                errorCode: -1,
                msg: error.message
            })
        }
    },

    login: async (req, res, next) => {
        try {
            let { error } = loginValidate(req.body);
            let { email, password } = req.body;

            if (error) {
                throw createError(error.details[0].message);
            }

            let user = await loginService(email);

            if (user == null) {
                throw createError.NotFound('User not registered');
            }

            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }

            const accessToken = await signAccessToken(user._id, user.role[0].name);
            const refreshToken = await signRefreshToken(user._id);
            return res.json({
                errorCode: 0,
                token: [
                    accessToken,
                    refreshToken
                ],
                name: user.name,
                email: user.email,
                image: user.image,
                _id: user._id,
                msg: 'Login successful'
            })


        } catch (error) {
            return res.json({
                errorCode: -1,
                msg: error.message
            })
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw createError.BadRequest()
            }
            // "payload": {
            //     "userId": "642fdd3460e5c6dd4e10a940",
            //     "role": "USER",
            //     "iat": 1681130024,
            //     "exp": 1712687624
            // },
            const payload = await verifyRefreshToken(refreshToken)

            // create a new accessToken 
            const accessToken = await signAccessToken(payload.userId, payload.role);
            const refToken = await signRefreshToken(payload.userId);

            return res.json({
                errorCode: 0,
                accessToken,
                refreshToken: refToken,
                msg: "Refresh token successfully"
            })
        } catch (error) {
            return res.json({
                errorCode: -1,
                msg: error
            })
        }
    },

    logout: async (req, res, next) => {
        try {

            const { refreshToken } = req.body;

            if (!refreshToken) {
                throw createError.BadRequest()
            }
            const { userId } = await verifyRefreshToken(refreshToken)
            client.del(userId.toString()), (err, reply) => {
                if (err) {
                    throw createError.InternalServerError();
                }
            }
            return res.json({
                errorCode: 0,
                msg: "Logout successfully",
            })

        } catch (error) {
            return res.json({
                errorCode: -1,
                msg: error
            })
        }
    }

}