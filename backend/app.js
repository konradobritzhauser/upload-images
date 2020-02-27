let express = require('express')
let app = express()
let bodyParser=require('body-parser')
// let cors=require('cors')
// let axios=require('axios')

//COMPONENTS





// app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json())



let initApp=()=>{
    let endpointsJS=require("./endpoints")
    
}



app.listen(3001,()=>console.log('server started on port 3001'))

module.exports={app}

initApp()




