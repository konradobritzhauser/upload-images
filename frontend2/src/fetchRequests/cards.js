
import {SERVER_URL} from "../config.js"

console.log('SERVER_URL', SERVER_URL)
let fetchRequests={}

fetchRequests.getAllCards=async ()=>{
    console.log('FETCHING GET ALL CARDS')
    let unparsedResponse=await fetch(SERVER_URL+"/all-cards")
    // console.log('unparsedResponse', unparsedResponse)
    let parsedResponse=await unparsedResponse.json()
    // console.log('parsedResponse', parsedResponse)
    let parsedResponse2=parsedResponse.map(elem=>{
        console.log('elem', elem)
        elem.posterSrc=elem.postersrc
        elem.numStars=elem.numstars
        return elem
    })
    console.log('parsedResponse2', parsedResponse2)
    return parsedResponse2
}

// fetchRequests.addCard=async(cardName,price,numStars,posterSrc)=>{
//     console.log('FETCHING ADD CARD')
    
//     let reqBody={name:cardName,price:price,numstars:numStars,postersrc:posterSrc}
//     let stringifiedReqBody=JSON.stringify(reqBody)
//     console.log('reqBody', reqBody)

//     console.log('stringifiedReqBody', stringifiedReqBody)
//     let unparsedResponse=await fetch(SERVER_URL+"/add-card",{method:"POST",body:stringifiedReqBody, headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       }})
//     let parsedResponse=await unparsedResponse.json()

//     return parsedResponse
// }

fetchRequests.addCard=async(cardName,price,numStars,posterSrc)=>{
    console.log('FETCHING ADD CARD')
    
    let photo = document.getElementById("image-file").files[0];
    let formData = new FormData();
    console.log('formData', formData)
    formData.append("card-photo", photo);
    // fetch('/upload/image', {method: "POST", body: formData});
    let unparsedResponse=await fetch(SERVER_URL+"/add-new-card"+`?name=${cardName}&price=${price}&numstars=${numStars}`,{method:"POST",body:formData
    // , headers: {
    //     'Content-Type': 'multipart/form-data'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   }
    })
    console.log('unparsedResponse', unparsedResponse)
    let parsedResponse=await unparsedResponse.json()
    console.log('parsedResponse', parsedResponse)
    return parsedResponse
}





export default fetchRequests