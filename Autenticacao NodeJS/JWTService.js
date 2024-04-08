var jwt = require('jsonwebtoken');

function JWTService(secretKey){

    var secretKey = secretKey;

    var methods = {};

    function isObjectNullOrUndefined(object){
        if(object === undefined || object === null){
            return true;
        }else{
            return false;
        }
    }
    function isStringNullOrEmpty(str){
        if(str === undefined || str === null || str === ''){
            return true;
        }else{
            return false;
        }
    }
    methods.generateToken = function (configurations) {
        if (isObjectNullOrUndefined(configurations)) {
            throw new Error('Argumentos para criar token não são válidos.');
        }

        return jwt.sign(configurations.data, secretKey, configurations.expireDate);
    }
    methods.isTokenValid = function (token) {
        if (isStringNullOrEmpty(token)) {
            throw new Error('O token fornecido é nulo ou vazio.');
        }

        try {
            jwt.verify(token, secretKey);
            return true;
        } catch (err) {
            return false;
        }
    }
    methods.getTokenData = function (token) {
        if (isStringNullOrEmpty(token)) {
            throw new Error('O token fornecido é nulo ou vazio.');
        }

        try {
            const decodedObject = jwt.verify(token, secretKey);
            return decodedObject;
        } catch (err) {
            throw err;
        }
    }
    
    return methods;
}

module.exports = {
    JWTService
};