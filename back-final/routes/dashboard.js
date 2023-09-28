var express = require("express");
var connection = require("../connection");
var router = express.Router();
// var mysql = require("mysql");
var { query } = require("express");
var jwt = require("jsonwebtoken");
const { Router } = require("express");
require("dotenv").config();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

var router = express.Router();
const { route } = require("./user");

const productService = require("../services/productService");

const dayjs = require("dayjs");



// pour nmbre commande total

router.get('/totalcommand',auth.authenticateToken,(req,res)=>{
    
    var query ="select count(CODEOF) as num from ordre_de_fabrication ;";
    connection.connection.query(query,(err,results) =>{
      console.log(results)
        if (!err){
          
            return res.status(200).json(results);
        
        }
        else {
            return res.status(500).json(err);
        }
    })
  })

  // nombre des commandes en attente
  router.get('/commandattente',auth.authenticateToken,(req,res)=>{
    
    var query ="select count(CODEOF) as num from ordre_de_fabrication where STATUT_OF = 'waiting' ";
    connection.connection.query(query,(err,results) =>{
      console.log(results)
        if (!err){
          
            return res.status(200).json(results);
        
        }
        else {
            return res.status(500).json(err);
        }
    })
  })

  //nombre des commandes en cours
  router.get('/commandcours',auth.authenticateToken,(req,res)=>{
    
    var query ="select count(CODEOF) as num from ordre_de_fabrication where STATUT_OF = 'launched' ";
    connection.connection.query(query,(err,results) =>{
      console.log(results)
        if (!err){
          
            return res.status(200).json(results);
        
        }
        else {
            return res.status(500).json(err);
        }
    })
  })

    //nombre des commandes terminées   
    router.get('/commandfini',auth.authenticateToken,(req,res)=>{
    
        var query ="select count(CODEOF)as num from ordre_de_fabrication where STATUT_OF = 'finished' ";
        connection.connection.query(query,(err,results) =>{
          console.log(results)
            if (!err){
              
                return res.status(200).json(results);
            
            }
            else {
                return res.status(500).json(err);
            }
        })
      })
    
//diagramme1
      router.get('/statecommande',auth.authenticateToken,(req,res)=>{
        var query =`SELECT CODEOF,QTE_OF,QTE_TRAVAILLEE FROM ordre_de_fabrication WHERE STATUT_OF='launched'`;
        connection.connection.query(query,(err,results) =>{
          console.log(results)
            if (!err){
              
                return res.status(200).json(results);
            
            }
            else {
                return res.status(500).json(err);
            }
        })
      })
    
      
      //diagramme2
      router.get('/tempstravaille',auth.authenticateToken,(req,res)=>{
        var query =`SELECT CODEOF,DATEDEBUTREEL,DATEFINREEL FROM ordre_de_fabrication WHERE STATUT_OF='finished'`;
        connection.connection.query(query,(err,results) =>{
          console.log(results)
            if (!err){
              
                return res.status(200).json(results);
            
            }
            else {
                return res.status(500).json(err);
            }
        })
      })
      // pour nmbre produit total

router.get('/totalprod',auth.authenticateToken,(req,res)=>{
    
  var query ="select count(CODE_ARTICLE) as num from produit ;";
  connection.connection.query(query,(err,results) =>{
    console.log(results)
      if (!err){
        
          return res.status(200).json(results);
      
      }
      else {
          return res.status(500).json(err);
      }
  })

 //nombre des produit en fin de stock   
    router.get('/prodfini',auth.authenticateToken,(req,res)=>{
    
        var query ="select count(CODE_ARTICLE)as num from produit where qte_dispo = 0 ";
        connection.connection.query(query,(err,results) =>{
          console.log(results)
            if (!err){
              
                return res.status(200).json(results);
            
            }
            else {
                return res.status(500).json(err);
            }
        })
      })
})
      module.exports = router;