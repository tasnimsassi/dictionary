const res = require("express/lib/response");
const db = require("../connection");
const dayjs = require("dayjs");

async function insertNewScannedQuantity(command_id,scanned_quantity,keypass,user_id) {
  let insertedOrdreDeFabrication = [];

  let query = `INSERT INTO quantity (codeof_id, scanned_quantity, keypass, user_id, date_scan) VALUES ("${command_id}", "${scanned_quantity}", "${keypass}", "${user_id}",now())`;

  let results;
  try {
    results = await db.query(query, []);

    if(!insertedOrdreDeFabrication.includes(command_id)) {
      let query_date = `select date_scan from quantity where codeof_id="${command_id}" `;
    let  results_query_date = await db.query(query_date, []);
    console.log(results_query_date[0]['date_scan']);
    let QTE_OF = `select QTE_OF from ordre_de_fabrication where codeof_id="${command_id}" `
    let QTE_TRAVAILLEE =`select QTE_TRAVAILLEE  from ordre_de_fabrication  where codeof_id="${command_id}" `

  if (QTE_OF < QTE_TRAVAILLEE){
    let dateFormated = dayjs(results_query_date[results_query_date.length-1]['date_scan']).format("YYYY-MM-DD h:mm:ss");
    let query_datefin =`UPDATE ordre_de_fabrication SET DATEFINREEL="${dateFormated}" WHERE CODEOF="${command_id}"`;
    let results_query_datefin = await db.query(query_datefin, []);
  }
    

    let dateFormated = dayjs(results_query_date[0]['date_scan']).format("YYYY-MM-DD h:mm:ss");
     let query_dateDebut =`UPDATE ordre_de_fabrication SET DATEDEBUTREEL="${dateFormated}" WHERE CODEOF="${command_id}"`;
     let results_query_dateDebut = await db.query(query_dateDebut, []);
    }
    
    insertedOrdreDeFabrication.push(command_id);
  } catch (error) {
    throw new Error(error.message);
  }
  if (results.affectedRows === 0) {
    throw new Error("command_id not found");
  }
  return;
}

async function updateQteTravaillee(command_id, scanned_quantity) {
  let query_getQuantiteTarvaillee = `SELECT QTE_TRAVAILLEE FROM ordre_de_fabrication WHERE CODEOF="${command_id}"`;
  const res = await db.query(query_getQuantiteTarvaillee, []);
  if (res.length > 0) {
    const quantiteTravillee = res[0]["QTE_TRAVAILLEE"];
    const newQunatity =
      parseInt(quantiteTravillee) + parseInt(scanned_quantity);
    let query_updateQuantity = `UPDATE ordre_de_fabrication SET QTE_TRAVAILLEE="${newQunatity}" WHERE CODEOF="${command_id}"`;
    const results = await db.query(query_updateQuantity, []);
    return results;
  } else {
    throw new Error("command_id is not found");
  }
}

async function checkMachineCode(machineCode, codeof_id) {
  let query_getMachineCode = `SELECT poste FROM ordre_de_fabrication WHERE poste="${machineCode}" and codeof="${codeof_id}"`;
  const result = await db.query(query_getMachineCode, []);
  if (result.length === 0) {
    return false;
  }
  return true;
}

async function getLastFiveScannedQuanty(codeof_id) {
  let query_getLastScannedQuantity = `SELECT scanned_quantity, date_scan, user_id FROM quantity WHERE codeof_id="${codeof_id}" ORDER BY date_scan DESC LIMIT 6`;
  try {
    const result = await db.query(query_getLastScannedQuantity, []);
    return result;
  } catch (error) {
    throw new Error("Error by executing sql query, wrong parameters");
  }
}

async function getTotalQuantity(codeof_id) {
  let query_getQuantiteTravaille = `SELECT QTE_TRAVAILLEE FROM ordre_de_fabrication WHERE CODEOF="${codeof_id}"`;
  try {
    const result = await db.query(query_getQuantiteTravaille, []);
    if (result.length !== 0) return result[0]["QTE_TRAVAILLEE"];
  } catch (error) {
    throw new Error("Error by executing sql query, wrong parameters");
  }
}

async function getMaximalQuantity(codeof_id) {
  let query_getMaximalQuantity = `SELECT QTE_OF FROM ordre_de_fabrication WHERE CODEOF="${codeof_id}"`;
  try {
    const result = await db.query(query_getMaximalQuantity, []);
    if (result.length !== 0) return result[0]["QTE_OF"];
  } catch (error) {
    throw new Error("Error by executing sql query, wrong parameters");
  }
}

async function validateQuantity(nouvellequantitéscanné, codeof_id) {
  // totalvalue < nouvellequantitéscanné + quantittravaillé
  let totalQuantiteTravaille;
  let totalvalue;
  try {

    totalvalue = await getMaximalQuantity(codeof_id);
    totalQuantiteTravaille = await getTotalQuantity(codeof_id);

    if (parseInt(totalvalue) < parseInt(nouvellequantitéscanné) + parseInt(totalQuantiteTravaille)) {
      return false;
    } else return true;
  } catch (error) {
    throw new Error("error by executing sql query");
  }
}

/// tbadel statut commande
async function setstatusof (codeof_id , scanned_quantity) {
  let totalQuantiteTravaille;
  let max;

  try {
  totalQuantiteTravaille = await getTotalQuantity(codeof_id); 
  max = await getMaximalQuantity(codeof_id); 
  console.log("-+-+6-+->",totalQuantiteTravaille);
  if(scanned_quantity === 0){
  let query_setstatusof1 = `UPDATE ordre_de_fabrication SET STATUT_OF="waiting" WHERE CODEOF="${codeof_id}"`;
  const res = await db.query(query_setstatusof1, []);}
  else if( parseInt(max) === parseInt(totalQuantiteTravaille)){
    let query_setstatusof3 = `UPDATE ordre_de_fabrication SET STATUT_OF="finished" WHERE CODEOF="${codeof_id}"`;
    const res = await db.query(query_setstatusof3, []);}  
  else if(scanned_quantity != 0){ 
  let query_setstatusof2 = `UPDATE ordre_de_fabrication SET STATUT_OF="launched" WHERE CODEOF="${codeof_id}"`;
  const res = await db.query(query_setstatusof2, []);}
  
   else{
     throw err ;
   }
  
  } catch (error) {
    throw new Error("table does not updated");
  }
}
/// pour inserer une remarque
async function insertremarque(codeof_id,user_id, commentaires,operation,) {
  let query_remarque = `INSERT into remarques( commentaires, operation ,id_user,code_commande ) values ("${commentaires}" , "${operation}" ,"${user_id}","${codeof_id}") `;
  try {
    const result = await db.query(query_remarque, []);
    
    
  } catch (err) {
   throw err ;
  }
  if (commentaires === undefined || operation=== undefined) {
    throw new Error("inserer une commande ou operation");
  }
return
}


////// pour supprimer une commande
async function supprimercommande(codeof_id) {
  let query_supprimer = `delete from ordre_de_fabrication where CODEOF= "${codeof_id}" `;
  try {
    const result = await db.query(query_supprimer, []);
    
    
  } catch (err) {
   throw err ;
  }
}
/// modifier une commande
async function updatecommande2(codeof_id,QTE_OF,poste) {
  
  let query_update = `update ordre_de_fabrication set QTE_OF="${QTE_OF}" , poste="${poste}" where CODEOF= "${codeof_id}" `;
  try {
    const result = await db.query(query_update, []);
    
    
  } catch (err) {
   throw err ;
  }
}

/// pour inserer ue commande 
async function insertcommande(CODE_PROJET, QTE_OF,OF_PARENT,DATEDEBUTOF,DATEFINOF,poste) {
  let query_commande = `INSERT into ordre_de_fabrication( CODE_PROJET, QTE_OF,OF_PARENT,DATEDEBUTOF,DATEFINOF,poste ) values ("${CODE_PROJET}" ,"${QTE_OF}" ,"${OF_PARENT}","${DATEDEBUTOF}","${DATEFINOF}","${poste}") `;
  try {
    const result = await db.query(query_commande, []);
    
  } catch (err) {
   throw err ;
  }
}

/// pour inserer un produit
async function insertProduct( CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement) {
  let query_product = `INSERT into produit(  CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement ) values 
  ("${CODEOF}" ,"${GRP_ARTICLE}" ,"${DESCRIPTION}","${UNITE_ACHAT}","${UNITE_VENTE}","${qte_dispo}","${id_site}","${id_emplacement}") `;
  try {
    const result = await db.query(query_product, []);
    
  } catch (err) {
   throw err ;
  }
}


/// pour inserer un site
async function insertSite( nom_site) {
  let query_product = `INSERT into site(nom_site) values ("${nom_site}") `;
  try {
    const result = await db.query(query_product, []);
    
  } catch (err) {
   throw err ;
  }
}

// pour inserer un emplacement
async function insertEmplacement( nom_emplacement) {
  let query_emplacement = `INSERT into emplacement(nom_emplacement ) values ("${nom_emplacement}") `;
  try {
    const result = await db.query(query_emplacement, []);
    
  } catch (err) {
   throw err ;
  }
} 

/// modifier table produit de stock
async function updateproduit( CODEOF, GRP_ARTICLE ,DESCRIPTION,UNITE_ACHAT,UNITE_VENTE,qte_dispo,id_site,id_emplacement,CODE_ARTICLE) {
  
  let query_update = `update produit set  CODEOF="${CODEOF}", GRP_ARTICLE="${GRP_ARTICLE}" ,DESCRIPTION="${DESCRIPTION}",UNITE_ACHAT="${UNITE_ACHAT}",UNITE_VENTE="${UNITE_VENTE}",qte_dispo="${qte_dispo}",id_site="${id_site}",id_emplacement="${id_emplacement}" where CODE_ARTICLE="${CODE_ARTICLE}" `;
  try {
    const result = await db.query(query_update, []);
    
    
  } catch (err) {
   throw err ;
  }
}

// ordre de transfert 
async function ordretransfert(CODE_ARTICLE, qte_transeree ,from_site,to_site,from_emplacement,to_emplacement,date_transfert,status_transfert) {
 
  let query = `INSERT into ordre_de_transfert( CODE_ARTICLE, qte_transeree ,from_site,to_site,from_emplacement,to_emplacement,date_transfert,status_transfert ) values ("${CODE_ARTICLE}" , "${qte_transeree}" ,"${from_site}","${to_site}","${from_emplacement}","${to_emplacement}","${date_transfert}","${status_transfert}") `;
  try {
    const result = await db.query(query, []);
    
  } catch (err) {
   throw err ;
  }
}

/// modifier quantité a tranferer
async function updatecommande( CODE_ARTICLE,qte_dispo) {

  let query_update = `update produit set qte_dispo="${qte_dispo}"  where CODE_ARTICLE= "${CODE_ARTICLE}" `;  
  try {
    const result = await db.query(query_update, []);
    
    
  } catch (err) {
   throw err ;
  }
}

////// pour supprimer un produit de stock
async function supprimerproduit(CODE_ARTICLE) {
  let query_supprimer = `delete from produit where CODE_ARTICLE= "${CODE_ARTICLE}" `;
  try {
    const result = await db.query(query_supprimer, []);
    
    
  } catch (err) {
   throw err ;
  }
}


////// pour supprimer un user
async function supprimeruser(id_user) {
  let query_supprimer = `delete from user where id_user= "${id_user}" `;
  try {
    const result = await db.query(query_supprimer, []);
    
    
  } catch (err) {
   throw err ;              
  }
}

////// pour supprimer une remarque
async function supprimerremarque(idremarques) {
  let query_supprimer = `delete from remarques where idremarques= "${idremarques}" `;
  try {                                 
    const result = await db.query(query_supprimer, []);
    
    
  } catch (err) {
   throw err ;
  }
}



module.exports = {
  insertNewScannedQuantity: insertNewScannedQuantity,
  updateQteTravaillee: updateQteTravaillee,
  checkMachineCode: checkMachineCode,
  getLastFiveScannedQuanty: getLastFiveScannedQuanty,
  getTotalQuantity: getTotalQuantity,
  validateQuantity:validateQuantity,
  setstatusof:setstatusof,
  insertremarque:insertremarque,
  supprimercommande:supprimercommande,
  insertProduct:insertProduct,
  insertEmplacement:insertEmplacement,
  insertSite:insertSite,
  updateproduit:updateproduit,
  insertcommande:insertcommande,
  ordretransfert:ordretransfert,
  updatecommande:updatecommande,
  supprimerproduit:supprimerproduit,
  supprimeruser:supprimeruser,
  supprimerremarque:supprimerremarque,
  updatecommande2:updatecommande2

 
};
 