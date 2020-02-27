const AWS = require('aws-sdk');
const fs=require("fs")

const ID = 'AKIAJ3BDKRCNWGJBARLQ';
const SECRET = "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";

const BUCKET_NAME = 'flower-cards';


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


const uploadFile = (filePath,fileName,bucketName=BUCKET_NAME,callback=null) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: bucketName,
        Key: fileName, 
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        if(callback){
            callback();
        }
    });
};
// uploadFile("./uploadedPhotos/84017.png","84017png",BUCKET_NAME+"/posters")

module.exports={uploadFile}