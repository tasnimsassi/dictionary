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
const { getMachineFromKeyPass, getQuantityFromKeyPass } = require("../utils");
const dayjs = require("dayjs");


//pour  telecharger un fichier pdf d commande
let ejs =require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid =require('uuid');
/////


router.post("/newWorkEntry",auth.authenticateToken, async (req, res) => {
  const { codeof, keypass, user_id } = req.body;

  if (!codeof || !keypass) {
    return res.status(400).json({ message: "incorrect user input" });
  }

  let scannedQuantity = getQuantityFromKeyPass(keypass); 
  let machineCode = getMachineFromKeyPass(keypass);
  let checkachineCode = await productService.checkMachineCode(machineCode,codeof);

  if (!checkachineCode) {
    return res.status(400).json({ message: "incorrect poste code" });
  }

  try {
    let result = await productService.insertNewScannedQuantity(codeof,scannedQuantity,keypass,user_id);
  
    let result2 = await productService.updateQteTravaillee(codeof,scannedQuantity);
    let lastScannedQuantity = await productService.getLastFiveScannedQuanty(codeof);
    let totalQuantiteTravaille = await productService.getTotalQuantity(codeof);
    let Result3 = await productService.setstatusof(codeof,lastScannedQuantity);
    return res.status(200).json({message: "succefully ",scannedQuantity: lastScannedQuantity,totalQuantity: totalQuantiteTravaille});
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//api endpoint/route 
//
router.post("/validate-scanned-quantity",auth.authenticateToken, async (req, res) => {
  const { codeof, scanned_quantity } = req.body;

  if (!codeof || !scanned_quantity) {
    return res.status(400).json({ error: "Request parameter/s not found" });
  }
  let validationResult;

  try {
    validationResult = await productService.validateQuantity(scanned_quantity,codeof
    );

    if (validationResult) {
      return res.status(201).json(1);
    }
    return res.status(201).json(0);
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});




// pour afficher table de commande

router.get('/getCommande',auth.authenticateToken,(req,res)=>{
    
  var query ="select codeof , qte_of , of_parent , DATEDEBUTOF,DATEFINOF,DATEDEBUTREEL,DATEFINREEL,STATUT_OF, poste,QTE_TRAVAILLEE  from ordre_de_fabrication";
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


///// ajouter une remarques
router.put("/remarques",auth.authenticateToken, async (req, res) => {
  const { codeof, user_id , commentaires,operation} = req.body;
  let Result;
  try {
   Result = await productService.insertremarque(codeof,user_id, commentaires,operation);
    return res.status(200).json({message: "succefully "});}
    catch (error){
      return res.status(500).json(error.message);
    }}
    
)
/// supprimer commande
router.delete("/supprimercommandes/:id/",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
  const  CODEOF =  req.params.id;
  console.log(CODEOF)
  let Result;
  try {
   
   Result = await productService.supprimercommande(parseInt(CODEOF));
    return res.status(200).json({message: "succefully deleted "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})

//// update ordrede fabbrication par admin
router.patch("/updatecommandes",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
  const { CODEOF , QTE_OF , poste} = req.body;
  
  let Result;
  try {
   Result = await productService.updatecommande2(CODEOF, QTE_OF , poste);

    return res.status(200).json({message: "succefully updated "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})

// pour ajouter une commande  l
router.post("/inserercommande",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
  const {CODE_PROJET, QTE_OF,OF_PARENT,DATEDEBUTOF,DATEFINOF,poste} = req.body;
  let validationResult;

  try {
    validationResult = await productService.insertcommande(CODE_PROJET, QTE_OF,OF_PARENT,DATEDEBUTOF,DATEFINOF,poste);

    if (validationResult) {
      return res.status(201).json({message: "ajouter avec succées "});
    }
    return res.status(201).json({message: "succefully updated "});
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});


// pour ajouter un produit
router.post("/insererProduit",auth.authenticateToken, async (req, res) => {
  console.log(req.body)
  const { CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement} = req.body;
  let validationResult;

  try {
    validationResult = await productService.insertProduct(CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement);

    if (validationResult) {
      return res.status(201).json({message: "ajouter avec succées "});
    }
    return res.status(201).json({message: "succefully updated "});
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});
// inserer site 

router.post("/inserersite",auth.authenticateToken, async (req, res) => {   
  const { nom_site} = req.body;
  let validationResult;

  try {
    validationResult = await productService.insertSite( nom_site);

    if (validationResult) {
      return res.status(201).json({message: "succefully updated "});
    }
    return res.status(201).json({message: "succefully updated "});
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});
 // inserer emplacement
router.post("/insereremplacement",auth.authenticateToken, async (req, res) => {
  const { nom_emplacement} = req.body;
  let validationResult;

  try {
  
  validationResult = await productService.insertEmplacement( nom_emplacement);

    if (validationResult) {
      return res.status(201).json({message: "succefully updated "});
    }
    return res.status(201).json({message: "succefully updated "});
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});

// pour afficher table des site

router.get('/getSite',auth.authenticateToken,(req,res)=>{
    
  var query ="select * from site ";
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


// pour afficher table des emplacements 

router.get('/getEmplacement',auth.authenticateToken,(req,res)=>{
    
  var query ="select *  from emplacement";
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

router.get('/getproduit',auth.authenticateToken,(req,res)=>{  
    
  var query ="select  p.*,s.nom_site,e.nom_emplacement from produit AS p,site As s ,emplacement As e where p.id_site=s.id_site and p.id_emplacement=e.id_emplacement   ";   
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


 // afficher les produits byid 
router.get("/afficherproduit/:id",auth.authenticateToken, async (req, res) => {
  const  CODE_ARTICLE  =  req.params.id;
  let query = ` select p.*,s.nom_site,e.nom_emplacement from produit AS p,site As s ,emplacement As e where  p.CODE_ARTICLE= "${CODE_ARTICLE}" and p.id_site=s.id_site and p.id_emplacement=e.id_emplacement ` ; // mouch hehd
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

//// update les produit des stock 
router.patch("/updateproduit",auth.authenticateToken,async (req, res) => {
  const { CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement,CODE_ARTICLE} = req.body;
  let Result;
  try {
   Result = await productService.updateproduit(CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement,CODE_ARTICLE);
    return res.status(200).json({message: "succefully updated "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})

router.get('/getcodeof',(req,res)=>{
    
  var query ="select codeof  from ordre_de_fabrication";
  connection.connection.query(query,(err,results) =>{                 
      if (!err){
        
          return res.status(200).json(results);
      
      }
      else {
          return res.status(500).json(err);
      }
  })
})

/// afficher remarques
router.get('/getremarque',auth.authenticateToken,(req,res)=>{
    
  var query ="select * from remarques ";
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
router.get('/getdetailscommande',(req,res)=>{
    
  var query ="select codeof , poste, qte_of  from ordre_de_fabrication";
  connection.connection.query(query,(err,results) =>{
   
      if (!err){
        
          return res.status(200).json(results);
      
      }
      else {
          return res.status(500).json(err);
      }
  })
})


router.post("/ordretransfert",auth.authenticateToken, async (req, res) => {   
  const { CODE_ARTICLE, Qte_Transfert ,id_site,To_id_site,id_emplacement,To_id_emplacement,date_transfert,status_transfert} = req.body;
 
  let validationResult;

  try {
    validationResult = await productService.ordretransfert( CODE_ARTICLE, Qte_Transfert ,id_site,To_id_site,id_emplacement,To_id_emplacement,date_transfert,status_transfert);

    if (validationResult) {
      return res.status(201).json({message: "succefully added "});
    }
   
  } catch (error) {
    console.log(error)
    return res.status(503).json({ error: error.message });
  }
});


//update quantité a transferer

router.put("/updatequantity",async (req, res) => {
  const { CODE_ARTICLE,qte_dispo} = req.body;
  let Result;
  try {
   Result = await productService.updatecommande(CODE_ARTICLE,qte_dispo);
    return res.status(200).json({message: "succefully updated "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})


/// supprimer produit de stock
router.delete("/supprimerproduit/:id/",auth.authenticateToken, async (req, res) => {
  const  CODE_ARTICLE =  req.params.id;
  console.log(CODE_ARTICLE)
  let Result;
  try {
   
   Result = await productService.supprimerproduit(parseInt(CODE_ARTICLE));
    return res.status(200).json({message: "succefully deleted "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})

/// supprimer user
router.delete("/supprimeruser/:id/",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
  const  id_user =  req.params.id;
  console.log(id_user)
  let Result;
  try {
   
   Result = await productService.supprimeruser(parseInt(id_user));
    return res.status(200).json({message: "succefully deleted "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})

/// supprimer remarque
router.delete("/supprimerremarque/:id/",auth.authenticateToken,checkRole.checkRole, async (req, res) => {
  const  idremarques =  req.params.id;
 
  let Result;
  try {
   
   Result = await productService.supprimerremarque(parseInt(idremarques));
    return res.status(200).json({message: "succefully deleted "});}
    catch (error){
      return res.status(500).json(error.message);
    }
})



/// afficher les ordres de transfert
router.get("/affichertransfert/:id",auth.authenticateToken, async (req, res) => {
  const  CODE_ARTICLE  =  req.params.id;
  let query = ` 
  select p.*,s.nom_site,e.nom_emplacement  from ordre_de_transfert AS p,site As s ,emplacement As e 

where  p.CODE_ARTICLE=  "${CODE_ARTICLE}" and
p.to_site=s.id_site and p.to_emplacement=e.id_emplacement 
  ` ; 


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


module.exports = router;


