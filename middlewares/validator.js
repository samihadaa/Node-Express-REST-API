const Joi = require('joi');

const signupSchema = Joi.object({
    email: Joi.string().email({tlds: {allow: ['com', 'net']}}).min(5).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  
  module.exports = {signupSchema}