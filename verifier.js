const crypto = require('crypto');
const encode = buffer => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const generateVerifier = () => encode(crypto.randomBytes(32));

console.log(generateVerifier());
