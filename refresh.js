const request = require('request');

const client_id = process.argv[2];
const refresh_token = process.argv[3];
const access_token = process.argv[4];

if (!client_id || !refresh_token || !access_token) {
  console.error('Please pass your client ID, refresh token and access_token (in that order) as arguments to this script');
  process.exit(1);
}

return request({
  uri: 'https://login.clause.io/oauth/token',
  method: 'POST',
  json: {
    grant_type: 'refresh_token',
    client_id,
    refresh_token,
    access_token
  }
}, (error, {statusCode=500, body='default error'}) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  }

  if (statusCode < 200 || statusCode > 299) {
    console.error(body);
    return process.exit(1);
  }

  return console.log(body.access_token);
});
