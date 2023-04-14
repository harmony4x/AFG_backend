const jwt = require('jsonwebtoken');
require('dotenv').config()
const createError = require('http-errors')
const client = require('../config/redis');

const signAccessToken = async (userId, role) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
            role

        }

        const secret = process.env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: '1h'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,


        }
        const secret = process.env.REFRESH_TOKEN_SECRET;

        const options = {
            expiresIn: '1y'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            client.set(userId.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                if (err) return reject(createError.InternalServerError());
                resolve(token)

            })
        })
    })
}

const verifyAccessToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))

        }

        req.payload = payload;
        next();
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return reject(err);
            }

            client.get(payload.userId, (err, reply) => {
                if (err) {
                    return reject(createError.InternalServerError());
                }
                if (refreshToken === reply) {
                    return resolve(payload);
                }
                return reject(createError.Unauthorized());
            })
        })
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
    signRefreshToken
}