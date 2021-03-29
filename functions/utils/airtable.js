const Airtable = require('airtable')

const { AIRTABLE_API_KEY, AIRTABLE_BASE_MERCHANDISING_ID, AIRTABLE_TABLE_PRODUCTS, AIRTABLE_BASE_CUSTOMER_ID, AIRTABLE_TABLE_CUSTOMERS } = process.env

const merch_base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_MERCHANDISING_ID)
const cust_base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_CUSTOMER_ID)


const product_table = merch_base(AIRTABLE_TABLE_PRODUCTS)
const customer_table= cust_base(AIRTABLE_TABLE_CUSTOMERS)

const getAllProducts = async () => {
  const allProducts = await product_table.select({}).firstPage()
  return allProducts.map(({ id, fields }) => transformResponse(id, fields))
}

// Get an individual product
const getProduct = async ({ id }) => {
  console.log({id})
  console.log('Ok')
  //for(var prop in id) {
  //console.log(prop,id[prop]); }
  const Product = await product_table.find(id)
  //console.log(Product)
  return ProductTransformResponse(Product["id"], Product["fields"])
}

// Get an individual customer object
const getCustomer = async ({ email }) => {
  filterFormula = "( {email} = '" + email + "')";
  const Customer = await customer_table.select({
          maxRecords: 1,
          filterByFormula: filterFormula,
        })
        .firstPage()
  try{ 
  return {...Customer[0]["fields"]}
  } catch{
    return undefined
  }
}



const addProduct = async ({ product }) => {
  const { name, description } = product
  const createProduct = await product_table.create([
    {
      fields: {
        name,
        description,
      },
    },
  ])
  const { id, fields } = createProduct[0]
  return ProductTransformResponse(id, fields)
}

const ProductTransformResponse = (id, fields) => ({
  id,
  name: fields.name,
  description: fields.description,
})

const CustomerTransformResponse = (id, fields) => ({
  email: fields.email,
  unique_link_short: fields.unique_link_short,
})


exports.getAllProducts = getAllProducts
exports.addProduct = addProduct
exports.getProduct = getProduct
exports.getCustomer = getCustomer
