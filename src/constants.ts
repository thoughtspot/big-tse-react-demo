export const USERNAME = `demo-user`;
// See https://github.com/thoughtspot/node-token-auth-server-example
// for the implementation of the below endpoint.
export const TOKEN_SERVER =
  "https://node-token-auth-server-example-two.vercel.app";
export const TOKEN_ENDPOINT = `${TOKEN_SERVER}/api/v2/gettoken/${USERNAME}`;
// If you change this to `demo-user` the request starts failing with 403
export const TOKEN_ENDPOINT_API = `${TOKEN_SERVER}/api/v2/gettoken/ashish.shubham@thoughtspot.com`;
export const TS_HOST = `embed-1-do-not-delete.thoughtspotstaging.cloud`;
