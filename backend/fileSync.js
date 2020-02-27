let fs=require("fs")


const deleteFile=(filePath)=>{
    fs.unlink(filePath, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
}

module.exports={deleteFile}
