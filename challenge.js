const crypto = require('crypto');
const verifier = process.argv[2];
const encode = buffer => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const calculateChallenge = verifier => encode(crypto.createHash('sha256').update(verifier).digest());

if (!verifier) {
  console.error('Please pass the verifier as the first argument to this script');
  process.exit(1);
}

console.log(calculateChallenge(verifier));
