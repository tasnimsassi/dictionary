var express = require('express');
var connection = require ('../connection');
var router = express.Router() ;
var mysql = require('mysql');
var { query } = require('express');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { Router } = require('express');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');



router.post('/signup', (req,res) =>{
    let user = req.body ;
    query=" select email, password , role , status from user where email = ?"
   connection.connection.query(query,[user.email],(err,results)=>{
        if (!err){
            if (results.length <=0 ){
                query = "insert into user ( name ,  contactNumber , email , password , status , role ) values(?,?,?,?,'false','user')";
                connection.connection.query(query,[user.name , user.contactNumber , user.email, user.password ], (err,results)=>{
                    if(!err){
                        return res.status(200).json ({message: "inscription  avec succès! "});
                    }
                    else {
                        return res.status(500).json(err) ;
                    }

                }
                )
            }
            else{
                return res.status(400).json({message :"email existe déjà ."});
            }
        }
   else {
       return res.status(500).json(err);
   }})
  

})


router.post('/login',(req,res) => {
    const user = req.body ;
    query = "select email,password, role, status, id_user from user where email=?";
    connection.connection.query(query,[user.email],(err,results) =>{
        console.log(results)
        if (!err){
            if(results.length <=0 || results[0].password !=user.password){
                return res.status(401).json({message:"identifiant ou mot de passe incorrect ! "});
            }
            else if ( results[0].status === 'false') {
                return res.status(401).json({message:"attendre l'approbation d'admin"});

            }
            else if (results[0].password == user.password){
                var reponse = { email: results[0].email, role: results[0].role, user_id: results[0]['id_user']}
                var accessToken = jwt.sign(reponse , process.env.ACCESS_TOKEN, { expiresIn : '8h'})
                 res.status(200).json({ token: accessToken,role:results[0].role, user_email: user.email, user_id:results[0]['id_user']});
            
      
            }
            else {
                return res.status(400).json({message:"quelque chose s'est mal passé. Veuillez réessayer plus tard"});
            }
            
        }
        else {
            return res.status(500).json(err);
        }
    })
})



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
       user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

router.post('/forgotPassword', (req,res)=>{
    const user = req.body;
    query = "select email , password from user where email=?";
    connection.connection.query(query,[user.email],(err,results) =>{
        if (!err){
            if(results.length <=0 )
            {
                return res.status(200).json({message:"mot de passe envoyé avec succès à votre email "});
            }
            else{
                var mailOptions = {
                    from : process.env.EMAIL,
                    to : results[0].email,
                    subject : 'mot de passe par manifacturing execution system cofat mateur',
                    html : '<p><b>vos identifiants de connexion pour manufacturing execution system cofat mateur</b><br><b>Email:</b></p>'+results[0].email+'<br><b>mot de passe: </b>'+results[0].password+'<br><a href="http://localhost:4200/">cliquez ici pour connecter </a></p>'              
                 };
                 transporter.sendMail(mailOptions,function(error,info) {
                     if(error){
                         console.log(error);
                     }
                     else{
                        console.log('email sent :' +info.response);
                     }
                 });
                 return res.status(200).json({message:"mot de passe envoyé avec succès à votre mail "});
            }
        }
        else {
            return res.status(500).json(err);
        }   
    
})
})




// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//        user : process.env.EMAIL,
//         pass : process.env.PASSWORD
//     }
// })

// router.post('/forgotPassword', (req,res)=>{
//     const user = req.body;
//     query = "select email , password from user where email=?";
//     connection.connection.query(query,[user.email],(err,results) =>{
//         if (!err){
//             if(results.length <=0 )
//             {
//                 return res.status(200).json({message:"password sent successfully to your mail "});
//             }
//             else{
//                 var mailOptions = {
//                     from : process.env.EMAIL,
//                     to : results[0].email,
//                     subject : 'password by manifacturing execution system cofat mateur',
//                     html : '<p><b>your login details for manufacturing execution system cofat mateur</b><br><b>Email:</b></p>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href="http://localhost:4200/">click here to login </a></p>'              
//                  };

//                  transporter.sendMail(mailOptions,function(error,info) {
//                      if(error){
//                          console.log(error);
//                      }
//                      else{
//                         console.log('email sent :' +info.response);
//                      }
//                  });
//                 // return res.status(200).json({message:"password sent successfully to your mail "});
//             }
//         }
//         else {
//             return res.status(500).json(err);
//         }   
    
// })
// })

router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    
    var query ="select id_user , name , email , contactNumber, status from user where role='user'";
    connection.connection.query(query,(err,results) =>{
        if (!err){
            return res.status(200).json(results);
        
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole, (req,res)=>{
    let user = req.body;
    var query = "update user set status=? where id_user=?" ;
    connection.connection.query(query,[user.status,user.id_user],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"l'identifiant d'utilisateur n'existe pas"});
            }
            return res.status(200).json({message:"utilisateur mis à jour avec succès"});
        }
        else {
            return res.status(500).json(err);

        }
        
    })
})

router.get('/checkToken' ,auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})

router.patch('/changePassword' , auth.authenticateToken, (req,res)=>{
  const user = req.body;
  const email = res.locals.email ;

  var query = "select * from user where email=? and password=?";
  connection.connection.query(query,[email , user.oldPassword],(err,results)=>{
      if(!err){
        if(results.length<=0){
            return res.status(400).json({message:"ancien mot de passe incorrect"});

         }
         else if(results[0].password == user.oldPassword){
             console.log("here")
              query = "update user set password=? where email=?";
              connection.connection.query(query,[ user.newPassword , email ],(err,results)=>{
                    console.log("results,,,",results)
                if(!err){
                    return res.status(200).json({message:"Mot de passe mis à jour avec succès"}); 
                }
                else{
                    return res.status(500).json(err);
                }

              })
           }
         else{
             return res.status(400).json({message:"quelque chose s'est mal passé. Veuillez réessayer plus tard"});
         }

         
      }
      
    else {
         return res.status(500).json(err);

        }
  })
})

/// SUPPRIMER USER 
router.delete("/supprimeruser",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
    
  })




  router.post('/getdetaille',(req,res)=>{
      let user=req.body;
    
    var nom;
    var tel;var rol ;
  var query =`select name as nom , email as email, contactNumber as tel ,role as rol from user where email='${req?.body?.email}'`;
  connection.connection.query(query,(err,results) =>{
   if (!err && results[0]){
    
    email=results[0].email;
    nom=results[0].nom;
    tel=results[0].tel;
    rol=results[0].rol;
    var data ={
      
        email: email,
        nom :nom,
        tel:tel,
        rol:rol
        };
return res.status(200).json(data);
  }
   else {
           return res.status(500).json(err);
  }
  
  })
  })
 
  
  router.patch('/block', (req,res)=>{
   let user = req.body
    var query = "update user set status= 'false' where email=?" ;
    connection.connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"L'utilisateur n'existe pas"});
            }
            return res.status(200).json({message:"utilisateur mis à jour avec succès"});
        }
        else {
            return res.status(500).json(err);

        }
        
    })
})
module.exports = router ;