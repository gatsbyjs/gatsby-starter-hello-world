
const faunadb = require('faunadb');
const query = faunadb.query;

function createClient() {
  if (!process.env.GATSBY_FAUNADB_SERVER_SECRET) {
    throw new Error(
      `No FAUNADB_SERVER_SECRET in environment, skipping client creation`
    );
  }
  const client = new faunadb.Client({
    secret: process.env.GATSBY_FAUNADB_SERVER_SECRET
  });
  return client;
}

exports.client = createClient();
exports.query = query;