const { ApolloServer, gql } = require("apollo-server-lambda")
const { resolvers } = require("./resolvers")
const { typeDefs } = require("./schema")
const { client, query } = require("./db")

//https://fauna.com/blog/building-a-job-posting-platform-with-faunadb-and-apollo
//https://github.com/netlify/netlify-dev-gatsby-fauna-demo/tree/master/functions/fauna-graphql
//https://github.com/molebox/serverless-graphql-potter/tree/master/functions/graphql

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => {
    return { client, query, headers: event.headers }
  },
})

const handler = server.createHandler()

module.exports = { handler }
