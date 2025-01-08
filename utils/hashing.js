const {hash,compare} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doHash = (value, saltValue) => {
   const result = hash(value, saltValue);
   return result;
}

const doHashComparison = (value, hashedValue)=>{
   const result = compare(value, hashedValue);
   return result;
}
module.exports = {doHash, doHashComparison}