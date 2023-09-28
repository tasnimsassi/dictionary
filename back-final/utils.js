


function getQuantityFromKeyPass(keypass) {
    return keypass.substr(14,3); 
}

function getMachineFromKeyPass(keypass) {
    return keypass.substr(17,4);
}


module.exports = {getQuantityFromKeyPass,getMachineFromKeyPass}