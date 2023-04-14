require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})


const that = module.exports = {

    setFilePublic: async (fileId) => {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                }
            })

            const getUrl = await drive.files.get({
                fileId,
                fields: 'webViewLink'
            })
            return getUrl;
        } catch (error) {
            return (error)

        }
    },

    uploadFile: async (shared, image) => {

        try {
            const createFile = await drive.files.create({
                requestBody: {
                    name: image,
                    // mimeType: 'image/jpg'
                },
                media: {
                    // mimeType: 'image/jpg',
                    body: fs.createReadStream(path.join(__dirname, `../public/images/upload/` + image))
                }
            });
            const fileId = createFile.data.id;
            const getUrl = await that.setFilePublic(fileId);
            return getUrl.data.webViewLink
        } catch (error) {
            return (error)
        }
    },
    deleteFile: async () => {
        try {
            const deleteFile = await drive.files.delete({
                fields: '1k18N6Jy7VcJjaOsswPbmojkynITb94EJ'
            })
            console.log(deleteFile.data);
        } catch (error) {
            return (error)
        }
    },
}