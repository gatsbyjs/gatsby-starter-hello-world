const {
  getAllProducts,
  addProduct,
  getProduct,
  getCustomer,
  brandProducts,
  getBrandProducts,
  getCustomerOrders,
  getBrandsFromCollection,
  getCollections
} = require("./utils/airtable")

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
        const Record = getProduct(args)
        return Record
      } catch (error) {
        throw new Error(error)
      }
    },
    getCustomer: (_, args) => {
      try {
        const Record = getCustomer(args)
        return Record
      } catch (error) {
        throw new Error(error)
      }
    },
    addProduct: (_, args) => {
      try {
        const createProduct = addProduct(args)
        return createProduct
      } catch (error) {
        throw new Error(error)
      }
    },
    getBrandProducts: (_, args) => {
      try {
        const brandList = getBrandProducts(args);
        return brandList
      } catch (error) {
        throw new Error(error)
      }
    },
    
    allStores: (obj, args, context) => {
        const { client, query: q } = context;
        return client
            .query(
                q.Map(
                    q.Paginate(q.Match(q.Index('all_stores')), {
                        size: 500
                    }),
                q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
                )
            )
            .then(result => result.data);
    },
    getCustomerOrders: (obj, args, context) => {
      try {
        const orderList = getCustomerOrders(args);
        return orderList
      } catch (error) {
        throw new Error(error)
      } 
    },
    getBrandsFromCollection: (obj, args, context) => {
      try {
        const brandList = getBrandsFromCollection(args);
        return brandList
      } catch (error) {
        throw new Error(error)
      } 
    },
    getCollections: (obj, args, context) => {
      try {
        const collectionList = getCollections(args);
        return collectionList
      } catch (error) {
        throw new Error(error)
      } 
    },

  },
}

exports.resolvers = resolvers