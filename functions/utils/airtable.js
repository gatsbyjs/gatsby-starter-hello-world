const Airtable = require('airtable')

const { AIRTABLE_API_KEY, AIRTABLE_BASE_MERCHANDISING_ID, AIRTABLE_TABLE_NAME } = process.env

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_MERCHANDISING_ID)

const table = base(AIRTABLE_TABLE_NAME)

const getAllProducts = async () => {
  const allProducts = await table.select({}).firstPage()
  return allProducts.map(({ id, fields }) => transformResponse(id, fields))
}

// Work in progress
const getProduct = async ({ id }) => {
  console.log({id})
  console.log('Ok')
  //for(var prop in id) {
  //console.log(prop,id[prop]); }
  const Product = await table.find(id)
  //console.log(Product)
  return transformResponse(Product["id"], Product["fields"])
}

const addProduct = async ({ product }) => {
  const { name, description } = product
  const createProduct = await table.create([
    {
      fields: {
        name,
        description,
      },
    },
  ])
  const { id, fields } = createProduct[0]
  return transformResponse(id, fields)
}

const transformResponse = (id, fields) => ({
  id,
  name: fields.name,
  description: fields.description,
})

exports.getAllProducts = getAllProducts
exports.addProduct = addProduct
exports.getProduct = getProduct