const path = require('path');


const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname + "/../public/images/upload");
    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = path.join(uploadPath, finalName);
    // let finalPath2 = `${uploadPath}/${finalName}`;
    // let uploadPath = __dirname + '/../public/images/upload/' + myFileName;
    try {
        await fileObject.mv(finalPath)
        return {
            status: 'Success',
            path: finalName,
            error: null,
        }
    } catch (error) {
        console.log("check error: ", error)
        return {
            status: 'Faild',
            path: null,
            error: JSON.stringify(error),
        }
    }

}

const uploadMultipleFile = async (filesArr) => {
    try {
        let arrResult = []
        countSuccess = 0
        for (let i = 0; i < filesArr.length; i++) {
            let myFileName = filesArr[i].name;

            myFileName = myFileName.split('.').join('-' + Date.now() + '.');
            let uploadPath = __dirname + '/../public/images/upload/' + myFileName;

            try {
                await filesArr[i].mv(uploadPath)
                arrResult.push({
                    status: 'Success',
                    path: myFileName,
                    error: null,
                })
                countSuccess++
            } catch (error) {
                arrResult.push({
                    status: 'Faild',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(error),
                })
            }


        }
        return {
            countSuccess: countSuccess,
            details: arrResult
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    uploadSingleFile, uploadMultipleFile,
}