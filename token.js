const request = require('request');
const querystring = require('querystring');

const client_id = process.argv[2];
const redirect_uri = process.argv[3];
const code = process.argv[4];
const code_verifier = process.argv[5];

if (!client_id || !redirect_uri || !code || !code_verifier) {
  console.error('Please pass your client ID, your redirect URL, the code and the verifier (in that order) as arguments to this script');
  process.exit(1);
}

const formData = querystring.stringify({
  grant_type: 'authorization_code',
  client_id,
  code_verifier,
  code,
  redirect_uri
});

return request({
  uri: 'https://login.clause.io/oauth/token',
  method: 'POST',
  headers: {
    'Content-Length': formData.length,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: formData
}, (error, {statusCode, body}) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  }

  if (statusCode < 200 || statusCode > 299) {
    console.error(JSON.parse(body));
    return process.exit(1);
  }

  const {access_token, refresh_token} = JSON.parse(body);

  console.log(`access_token: ${access_token}`);
  console.log(`refresh_token: ${refresh_token || '(not in scope)'}`);
  return;
});
