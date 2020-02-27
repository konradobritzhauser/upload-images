let initiateEndpoints=()=>{
}



let app=require("./app").app

console.log('app', app)




let databaseOP=require("./databaseOP")

let generateRandomNumber=require("./utilities").randomIntBetween

let deleteFile=require("./fileSync").deleteFile

let awsUploadFile=require("./awsOP").uploadFile



app.get('/all-cards',async (req,res)=>{
    // console.log('endpoint hit getAllCollections')
    // console.log('collectionsResponse', collectionsResponse)

    let allCards=await databaseOP.getAllCards()
    // console.log('allCards', allCards)
  
    res.status(200).json(allCards.rows)
  })

app.post('/add-card',async (req,res)=>{
    console.log('ENDPOINT HIT ADD CARD')
    // console.log('req', req)
    let body=req.body
    // console.log('body', body)
    let id=generateRandomNumber(10000,99999);
    let dbResp;
    if(!body.posterSrc){
        dbResp=await databaseOP.addCard(id,body.name,body.price,body.numstars)
    }else{
        dbResp=await databaseOP.addCard(id,body.name,body.price,body.numstars,body.postersrc)
    }
    console.log('dbResp', dbResp)
    if(dbResp){
      res.status(200).json({code:200,message:"SUCCESS"})
    }else{
      res.status(400).json({code:400,message:"FAILED"})
    }
})





let multer=require("multer")


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './')
  },
  filename: function (req, file, callback) {
    console.log('req IN MULTER', req.query)

    console.log('file', file)
    callback(null, file.fieldname +".png")
  }
});


var upload = multer({ storage: storage }).single('image'); // just make sure field name should be same as client form data field name



var storageImage=multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './')
  },
  filename: function (req, file, callback) {
    // console.log('req IN MULTER', req.query)
    console.log('file', file)
    callback(null, file.fieldname +".png")
  }
});

let uploadImage=multer({ storage: storageImage}).single('image');



// To upload multiple image 
//var upload = multer({ storage: storage }).array('images', maxCount);
// req.files is array of `images` files
// maxCount files could be uploaded 

app.post('/uploads', function (req, res) {
  console.log('HIT UPLOADS')
  // console.log('req', req)
  upload(req, res, function (err) {
    console.log('err AT FIRST', err)
    if (err instanceof multer.MulterError) {
      console.log('MULTER ERROR')
      console.log('err', err)
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
})


app.post('/add-new-card', async (req, res)=> {
  console.log('HIT ADD NEW CARD')
  let params=req.query
  console.log('params', params)
  
  let name=params.name
  let price=params.price
  let numstars=params.numstars
  let postersrc=params.postersrc


  let id=generateRandomNumber(10000,99999);
  let dbResp;
    
    if(!postersrc){
        dbResp=await databaseOP.addCard(id,name,price,numstars)
    }else{
        dbResp=await databaseOP.addCard(id,name,price,numstars,postersrc)
    }
    console.log('dbResp', dbResp)
    if(dbResp){
      // res.status(200).json({code:200,message:"SUCCESS"})
    }else{
      res.status(400).json({code:400,message:"Fields are not filled out correctly"})
      return
    }


  let storageImage=multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploadedPhotos')
    },
    filename: function (req, file, callback) {
      // console.log('req IN MULTER', req.query)
      let fileNameArr=file.originalname.split(".")
      let fileType=fileNameArr[fileNameArr.length-1]
      
      if(fileType!=="png"){
        res.status(400).json({code:400,message:"File is not a png"})
      }
      
      console.log('file', file)

      callback(null, id +".png")
    }
  });
  
  let uploadImage=multer({ storage: storageImage}).single('card-photo');


  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({code:400,message:"Error uploading image"})

      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    //UPLOAD FILE TO AWS BUCKET
    awsUploadFile(`./uploadedPhotos/${id}.png`,`${id}.png`,"flower-cards/posters",()=>{
      deleteFile(`./uploadedPhotos/${id}.png`)

      res.status(200).json({code:200,message:"Successfully added card. Feel free to check it in the home page"})
      //UPLOADED AND DELETED FILE LOCALLY SUCCESSFULLY
    })
    
    
  })
})

module.exports={initiateEndpoints}
