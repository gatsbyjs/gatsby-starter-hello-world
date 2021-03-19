const { ApolloServer, gql } = require('apollo-server-lambda')
const { getAllProducts, addProduct, getProduct } = require('./utils/airtable')

// Defines the types of products sent by graph QL
const typeDefs = gql`
  type Product {
    id: ID
    name: String
    description: String
  }
  input ProductInput {
    name: String
    description: String
  }
  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    addProduct(product: ProductInput): Product
  }
`

const resolvers = {
  Query: {
    getProducts: () => {
      try {
        const allRecords = getAllProducts()
        return allRecords
      } catch (error) {
        throw new Error(error)
      }
    },
    getProduct: (_, args) => {
      try {
        console.log(args)
        const Record = getProduct(args)
        return Record
      } catch (error) {
        throw new Error(error)
      }
    },
    addProduct: (_, args) => {
      try {
        const createProduct = addProduct(args)
        return createProduct
      } catch (error) {}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }