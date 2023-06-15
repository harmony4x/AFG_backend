require('dotenv').config()
const port = process.env.port || 8888;
const express = require('express')
const app = express()
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const connection = require('../src/config/database')
const createError = require('http-errors')
require('./config/redis')
const { uploadFile } = require('./models/upload')
const cors = require('cors');
const { Server } = require("socket.io");
const { asyncHandler } = require('./helpers/asyncHandler');
const commentController = require('./controllers/commentController');
const notificationController = require('./controllers/notificationController');

// uploadFile({ shared: true })

configViewEngine(app)

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', webRouter);
app.use('/v1/api', apiRouter);

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

let onlineUsers = [];

const addNewUser = (username, userId) => {
    !onlineUsers.some((user) => user.username === username) &&
        onlineUsers.push({ username, userId });
};

const io = new Server({
    cors: {
        origin: 'http://localhost:3000',
    }
});
io.on("connection", (socket) => {

    socket.on("newUser", (username, userId) => {

        socket.join(userId)
        console.log(`User ${userId} joined the room`);
        addNewUser(username, userId)

    });

    socket.on("sendNotification", ({ senderName, senderImage, senderId, receiverName, receiverId, postSlug, postId, postTitle, comment, parentComment }) => {
        const newComment = asyncHandler(commentController.createCommentWithSocketIO({ content: comment, parentComment, user: senderId, post: postId }))

        if (newComment) {
            asyncHandler(notificationController.createNotification({ senderName, senderId, receiverId, postTitle, postSlug, postId }))
        }

        io.to(receiverId).emit("getNotification", {
            senderName,
            senderImage,
            postSlug
        });
    });

    socket.on("disconnect", () => {

        removeUser(socket.id);
    });
});




io.listen(5000);


app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })

});

(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Example listening on port ${port}`);
        });
    } catch (error) {
        console.error('>>>>>Check error: ', error);
    }
})();

