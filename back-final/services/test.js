const res = require('express/lib/response');
var query = require('./productService')




// let resu = query.insertNewScannedQuantity(12, 1414);

// let res_2 = query.updateQteTravaillee(12, 400)

// console.log("a");
// let res_3 = query.checkMachineCode("komx");
// res_3.then((data) => {console.log(data)}).catch(error=> console.log(error))


// console.log("b");

// OLD USE OF ASYNCHRONE OPERATIONS



async function xxx(){
        let data = await query.checkMachineCode("komx");
}

xxx()