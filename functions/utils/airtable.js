const Airtable = require('airtable')

const { GATSBY_AIRTABLE_API_KEY, GATSBY_AIRTABLE_BASE_MERCHANDISING_ID,
  GATSBY_AIRTABLE_BASE_REORDER_ID, GATSBY_AIRTABLE_TABLE_PRODUCTS, GATSBY_AIRTABLE_TABLE_BRANDS,
  GATSBY_AIRTABLE_BASE_CUSTOMER_ID, GATSBY_AIRTABLE_TABLE_CUSTOMERS, 
  GATSBY_AIRTABLE_TABLE_REORDER_REORDERS } = process.env

const merch_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_MERCHANDISING_ID)
const cust_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_CUSTOMER_ID)
const reorder_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_REORDER_ID)


const product_table = merch_base(GATSBY_AIRTABLE_TABLE_PRODUCTS)
const customer_table= cust_base(GATSBY_AIRTABLE_TABLE_CUSTOMERS)
const reorder_table= reorder_base(GATSBY_AIRTABLE_TABLE_REORDER_REORDERS)
const brand_table= reorder_base(GATSBY_AIRTABLE_TABLE_BRANDS)


const getAllProducts = async () => {
  const allProducts = await product_table.select({}).firstPage()
  return allProducts.map(({ id, fields }) => transformResponse(id, fields))
}

const getBrandProducts = async ({ brand_id }) => {
  filterFormula = "( {brand_id} = '" + brand_id + "')";
  const allProducts = await product_table.select({
      filterByFormula: filterFormula,
    }).firstPage()
  return allProducts.map(({ id, fields }) => BrandProductTransformResponse(id, fields))
}


// Get an individual product
const getProduct = async ({ id }) => {
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


// Creates the airtable order
const logOrder = async (o) => {
  const newOrder = await reorder_table.create([
  {
    fields: {
      email : o.email,
      ordered_cart: JSON.stringify(o.cart),
    }
  }
    ])
  return newOrder
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


const BrandProductTransformResponse = (id, fields) => ({
  id,
  name: fields.name,
  price: fields.price,
  product_id: fields.product_id,
  image_url_1: fields.image_url_1,
  product_average_local_shipping: fields.product_average_local_shipping,
  product_wholesale_price: fields.product_wholesale_price,
  title: fields.title,
  is_in_stock: fields.is_in_stock,
})




const CustomerTransformResponse = (id, fields) => ({
  email: fields.email,
  unique_link_short: fields.unique_link_short,
})


exports.getAllProducts = getAllProducts
exports.addProduct = addProduct
exports.getProduct = getProduct
exports.getCustomer = getCustomer
exports.logOrder = logOrder
exports.getBrandProducts = getBrandProducts


