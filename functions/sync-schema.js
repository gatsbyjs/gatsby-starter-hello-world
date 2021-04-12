/* sync GraphQL schema to your FaunaDB account - use with `netlify dev:exec <path-to-this-file>` */
function createFaunaGraphQL() {
  if (!process.env.FAUNADB_SERVER_SECRET) {
    console.log("No FAUNADB_SERVER_SECRET in environment, skipping DB setup");
  }
  console.log("Upload GraphQL Schema!");

  var request = require("request");
  const fs = require("fs");
  const path = require("path");
  var dataString = fs
    .readFileSync(path.join(__dirname, "schema.graphql"))
    .toString(); // name of your schema file

  var options = {
    url: "https://graphql.faunadb.net/import",
    method: "POST",
    body: dataString,
    auth: {
      user: process.env.FAUNADB_SERVER_SECRET,
      pass: ""
    }
  };

  request(options, callback);

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      // // for debugging
      // console.log("body", body);
    } else {
      console.error("something wrong happened: ", { error, body });
    }
  }
}

createFaunaGraphQL();