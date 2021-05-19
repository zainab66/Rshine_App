const express = require('express');
const router = express.Router();
const data = require('../data.js');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils.js');
const authorize = require("../middleware/authorize")
const isAdmin = require("../middleware/adminAuthorize")
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require("../middleware/validInfo")
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const expressAsyncHandler = require('express-async-handler');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox7f066ce9ef0e4c698e5437c98ba86cc2.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require('lodash')
const {OAuth2Client} = require('google-auth-library');
const fetch = require('node-fetch');

const client = new OAuth2Client(process.env.googleClintId_KEY)



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage });





/* GET users listing. */
router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

router.post('/signin', expressAsyncHandler(async (req, res) => {
  const {email, password} = req.body;
   User.findOne({email}).exec((err,user)=>{
    if (err) {
      return res.status(400).json({error:"this user does not exist"
    })
    } 
    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})


    const token = jwt.sign({  _id:user._id}, process.env.JWT_SIGNIN_KEY,{
      expiresIn: '7d',
    });

    const{_id,name,email}=user;
    res.json({
      token,_id,name,email
    })
    
   })

  // if (user) {
  //   if (bcrypt.compareSync(req.body.password, user.password)) {
  //     res.send({
  //       _id: user._id,
  //       name: user.name,
  //       profilePicture: user.profilePicture,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       token: generateToken(user),
  //     });
  //     return;
  //   }
  // }
  // res.status(401).send({ message: 'Invalid email or password' });
})
);


// router.post('/register', upload.single('profilePicture'), expressAsyncHandler(async (req, res) => {
//   const user2 = await User.findOne({ email: req.body.email });
//   if (user2) return res.status(401).send({ message: 'User already exists' });
//   let data = req.body;

//   let smtpTransport = nodemailer.createTransport({
//     service: 'Gmail',
//     port: 465,
//     auth: {
//       user: 'zainabdeveloper123@gmail.com',
//       pass: 'rzan2015'
//     }
//   })

//   let mailOptions = {
//     from: 'zainabdeveloper123@gmail.com',
//     to: data.email,
//     subject: ' Account Activation Link',
//     html: `<h2>Hello ${data.name}</h2>
//            <h2>Please click on given link to activate you account</h2>
//           `}
// //  <p>${ process.env.CLIENT_URL}/authentication/activate/${token}</p>
//   smtpTransport.sendMail(mailOptions, (error, response) => {
//     if (error) {
//       res.send(error)
//     } else {
//       res.send('success')
//     }
//   })
//   smtpTransport.close();
// let profilePicture;
//   if ( req.file) {
   
//       profilePicture = req.file.originalname;

//     }
 
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     profilePicture:profilePicture,
//   });
//   const createdUser = await user.save();
//   res.send({
//     _id: createdUser._id,
//     name: createdUser.name,
//     email: createdUser.email,
//     isAdmin: createdUser.isAdmin,
//     profilePicture: createdUser.profilePicture,
//     token: generateToken(createdUser),
//   });
// })
// );





router.post('/register', upload.single('profilePicture'), expressAsyncHandler(async (req, res) => {
  const user2 = await User.findOne({ email: req.body.email });
  if (user2) return res.status(401).send({ message: 'User already exists' });
  let data = req.body;
  let {_id,name,email,isAdmin} = req.body;
 const  password= bcrypt.hashSync(req.body.password, 8);
 let profilePicture;
 if (req.file) {
   profilePicture= req.file.originalname;
 }
const token = jwt.sign({ name,email,password, profilePicture,isAdmin}, process.env.JWT_ACC_ACTIVATE,{
  expiresIn: '20m',
});

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: '',
      pass: ''
    }
  })

  let mailOptions = {
    from: '',
    to: data.email,
    subject: ' Account Activation Link',
    html: `<h2>Hello ${data.name}</h2>
           <h2>Please click on given link to activate you account</h2>
           <p>${ process.env.CLIENT_URL}/authentication/activate/${token}</p>`}

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error)
    } else {
      res.send('success')
    }
  })
  smtpTransport.close();
 
})
);






router.post('/email-activate', expressAsyncHandler(async (req, res) => {
const {token}=req.body.token; 
console.log('to',token)
if (token) {
jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
  if (err) {
    return res.status(400).json({error:"Incorrect or Expired link"})
  } 
  const {name,email,password,profilePicture,isAdmin}=decodedToken;
  //const profilePicture= req.file.originalname;

  User.findOne({ email}).exec((err,user)=>{
    if(user){
      return res.status(401).send({ message: 'User already exists' });
    }



    let newUser = new User({name,email,password,
      profilePicture,isAdmin
  });

  newUser.save((err,success)=>{

  if(err){
    return res.status(400).json({error:err})
  }
  // res.send({
  //   _id: createdUser._id,
  //   name: createdUser.name,
  //   email: createdUser.email,
  //   isAdmin: createdUser.isAdmin,
  //   profilePicture: createdUser.profilePicture,
  //   token: generateToken(createdUser),
  // });
res.json({message:"signup success",success})
  })
})
})
}else{
  return res.json({error:"Incorrect "})

}
})
);





router.put( '/forget-password', expressAsyncHandler(async (req, res) => {
  const {email} = req.body;
  console.log(email)

User.findOne({email},(err,user)=>{
if(err || !user){
  return res.status(400).send({ message: 'User does not exists' });
}
const token = jwt.sign({ _id:user._id}, process.env.RESET_PASSWORD_KEY,{
  expiresIn: '20m',
});

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: '',
      pass: ''
    }
  })

  let mailOptions = {
    from: '',
    to: email,
    subject: 'Reset Your Password',
    html: `
           <h2>Please click on given link to reset your password</h2>
           <p>${ process.env.CLIENT_URL}/resetpassword/${token}</p>`}

return user.updateOne({resetLink:token},function(err,success){
if(err){
  return res.status(400).json({ error: 'reset password link error' });
}else{

smtpTransport.sendMail(mailOptions, (error, response) => {
  if (error) {
    res.send(error)
  } else {
    res.send('success')
  }
})
smtpTransport.close();
}

})
})
})
);


router.put( '/reset-password', expressAsyncHandler(async (req, res) => {
  const {resetLink,newPass}=req.body;
  if(resetLink){
    jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY,function(error,decodedData){

      if (error) {
        return res.status(401).json({error:"Incorrect or Expired link"})
      } 

User.findOne({resetLink},(err,user)=>{
  if(err || !user){
    return res.status(400).send({ message: 'User with this token does not exists' });
  }
  const obj={
    password:bcrypt.hashSync(newPass, 8),
    resetLink:''
  }

user =_.extend(user,obj);
user.save((err,result)=>{
  if(err){
    return res.status(400).json({ error: 'reset password  error' });
  }else{
    return res.status(200).json({ error: 'your password has been changed' });

  }
})




})


    })
  }else{
   
      return res.status(401).json({ error: 'Authentication error' });
    
  }




}));





// router.post('/googlelogin', expressAsyncHandler(async (req, res) => {
//   const {tokenId} = req.body;
//   const verify = await client.verifyIdToken({idToken:tokenId,audience:"458718696515-c0bok4ghr7oc82bnc0ldok07t37a3omv.apps.googleusercontent.com"})
//     const{email_verified,name,email} = verify.payload;
 
//     const password = email + process.env.JWT_SIGNIN_KEY
//     const passwordHash = await bcrypt.hash(password, 8)

//     if(!email_verified) return res.status(400).json({msg: "Email verification failed."})
//     const user = await User.findOne({email})

//     if(user){
//       const isMatch = await bcrypt.compare(password, user.password)
//       if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

//       const token = jwt.sign({ _id:user._id}, process.env.JWT_SIGNIN_KEY,{
//         expiresIn: '20m',
//       });
      
//       res.send({
//         _id: user._id,
//         name: user.name,
//         profilePicture: user.profilePicture,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token,
//       });
//     }else{
//       const newUser = new User({
//           name, email, password: passwordHash
//       })

//       await newUser.save()
//       const token = jwt.sign({ _id:newUser._id}, process.env.JWT_SIGNIN_KEY,{
//         expiresIn: '20m',
//       });
//       res.send({
//         _id: newUser._id,
//         name: newUser.name,
//         profilePicture: newUser.profilePicture,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin,
//         token,
//       });}
// })
// );








router.post('/googlelogin', expressAsyncHandler(async (req, res) => {
  const {tokenId} = req.body;
  const verify = await client.verifyIdToken({idToken:tokenId,audience:process.env.googleClintId_KEY})
    const{email_verified,name,email} = verify.payload;
 
    const password = email + process.env.JWT_SIGNIN_KEY
    const passwordHash = await bcrypt.hash(password, 8)

    if(email_verified) {
      User.findOne({email}).exec((err,user)=>{
if(err){
  return res.status(400).json({
    error:"somthing wrong ..."
  })
}else{
  if(user){
    const token = jwt.sign({ _id:user._id}, process.env.JWT_SIGNIN_KEY,{
      expiresIn: '20m',
    });
    const{_id,name,email}=user;
    res.json({
      token,_id,name,email
    })
  }else{
 

    let newUser = new User({name,email,password:passwordHash});
    newUser.save((err,data)=>{
      if(err){
        return res.status(400).json({
          error:"somthing wrong ..."
        })
      }
      const token = jwt.sign({ _id:data._id}, process.env.JWT_SIGNIN_KEY,{
        expiresIn: '20m',
      });
      const{_id,name,email}=newUser;
      res.json({
        token,_id,name,email
      })
    })
  }

}
      })
    }
    
    
})
);





router.post('/facebooklogin', expressAsyncHandler(async (req, res) => {
  const {userID,accessToken} = req.body;
//let urlGraphFacebook =`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  
const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

const data = await fetch(URL).then(res => res.json()).then(res => {return res})
const {email, name, picture} = data

const user = await User.findOne({email})
const password =email+process.env.JWT_SIGNIN_KEY;
    const passwordHash = await bcrypt.hash(password, 8)
     
          if(user){
            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            const token = jwt.sign({ _id:user._id}, process.env.JWT_SIGNIN_KEY,{
              expiresIn: '20m',
            });
            const{_id,name,email}=user;
            res.json({
              token,_id,name,email
            })
          }else{
         

            const newUser = new User({name,email,password:passwordHash});
            newUser.save((err,data)=>{
              if(err){
                return res.status(400).json({
                  error:"somthing wrong ..."
                })
              }
              const token = jwt.sign({ _id:data._id}, process.env.JWT_SIGNIN_KEY,{
                expiresIn: '20m',
              });
              const{_id,name,email}=newUser;
              res.json({
                token,_id,name,email
              })
            })
          }
        
       
})
);







































router.get('/:id', expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);


router.put('/profile', authorize, upload.single('profilePicture'), expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }

    if ( !req.file) {
    user.profilePicture ;
    }else{
      user.profilePicture = req.file.originalname;

    }
    console.log(user.profilePicture)
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profilePicture: updatedUser.profilePicture,
      token: generateToken(updatedUser),
    });
  }
})
);


router.get(
  '/',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);


router.delete(
  '/:id',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


router.put(
  '/:id',
  authorize,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);








module.exports = router;
