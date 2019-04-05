const request = require('request');

const client_id = process.argv[2];
const refresh_token = process.argv[3];

if (!client_id || !refresh_token) {
  console.error('Please pass your client ID and refresh token (in that order) as arguments to this script');
  process.exit(1);
}

return request({
  uri: 'https://login.clause.io/oauth/token',
  method: 'POST',
  json: {
    grant_type: 'refresh_token',
    client_id,
    refresh_token
  }
}, (error, {statusCode, body}) => {
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
