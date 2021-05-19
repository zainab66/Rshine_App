const express = require('express');
const router = express.Router();
const contact  = require('../models/contactModel.js');
const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');


router.post('/',expressAsyncHandler(async (req, res) => {
let data = req.body;
let smtpTransport = nodemailer.createTransport({
    service:'Gmail',
    port:465,
    auth:{
        user:'zainabdeveloper123@gmail.com',
        pass:'rzan2015'
    }
})

let mailOptions ={
    from:data.email,
    to:'zainabdeveloper123@gmail.com',
    subject:`message from ${data.name}`,
    html:`
    <h3>Information</h3>
    <ul>
    <li>Name:${data.name}</li>
    <li>Email:${data.email}</li>
    <li>Subject:${data.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    
    
    `
}



smtpTransport.sendMail(mailOptions,(error,response)=>{
if(error){
    res.send(error)
}else{
    res.send('success')
}
})
smtpTransport.close();
})
);


module.exports = router;
