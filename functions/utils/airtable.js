const Airtable = require('airtable')

const { GATSBY_AIRTABLE_API_KEY, GATSBY_AIRTABLE_BASE_MERCHANDISING_ID,
  GATSBY_AIRTABLE_BASE_REORDER_ID, GATSBY_AIRTABLE_TABLE_PRODUCTS, GATSBY_AIRTABLE_TABLE_BRANDS,
  GATSBY_AIRTABLE_BASE_CUSTOMER_ID, GATSBY_AIRTABLE_TABLE_CUSTOMERS, 
  GATSBY_AIRTABLE_TABLE_REORDER_REORDERS,GATSBY_AIRTABLE_TABLE_ORDERS,GATSBY_AIRTABLE_TABLE_COLLECTIONS } = process.env

const merch_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_MERCHANDISING_ID)
const cust_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_CUSTOMER_ID)
const reorder_base = new Airtable({ apiKey: GATSBY_AIRTABLE_API_KEY }).base(GATSBY_AIRTABLE_BASE_REORDER_ID)


const product_table = merch_base(GATSBY_AIRTABLE_TABLE_PRODUCTS)
const brand_catalog_table = merch_base(GATSBY_AIRTABLE_TABLE_BRANDS)
const collection_table = merch_base(GATSBY_AIRTABLE_TABLE_COLLECTIONS)
const customer_table= cust_base(GATSBY_AIRTABLE_TABLE_CUSTOMERS)
const reorder_table= reorder_base(GATSBY_AIRTABLE_TABLE_REORDER_REORDERS)
const brand_table= reorder_base(GATSBY_AIRTABLE_TABLE_BRANDS)
const order_table= cust_base(GATSBY_AIRTABLE_TABLE_ORDERS)

// Get all  products from airtable 
const getAllProducts = async () => {
  const allProducts = await product_table.select({}).firstPage()
  return allProducts.map(({ id, fields }) => transformResponse(id, fields))
}

// Get all the products from a brand 
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


// Creates the airtable order record when an order is placed through the /order_confirmation
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

// Test function to create a new product
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


// Get all orders from a customers
const getCustomerOrders = async ({ email }) => {
  filterFormula = "( {email} = '" + email + "')";
  const allOrders = await order_table.select({
      filterByFormula: filterFormula,
    }).firstPage()
  return allOrders.map(({ id, fields }) => OrderTransformResponse(id, fields))
}

// Get all brands from a collection from a customers
const getBrandsFromCollection = async ({ collection_name }) => {
  filterFormula = "( SEARCH('"+collection_name+"',{Collection Suggestion}) )";
  const allBrands = await brand_catalog_table.select({
      filterByFormula: filterFormula,
    }).firstPage()
  return allBrands.map(({ id, fields }) => BrandTransformResponse(id, fields))
}


// Get all collections to display on the collection page from the AT merch page 
const getCollections = async () => {
  filterFormula = "( {visible_on_reorder_app_with_checks} = 'Yes')";
  const allCollections = await collection_table.select({
      filterByFormula: filterFormula,
    }).firstPage()
  return allCollections.map(({ id, fields }) => CollectionTransformResponse(id, fields))
}


//------------------- Transformers for AT payloads ----------------------//


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

// Transform the response from AT on customer table into the GraphQL schema
const CustomerTransformResponse = (id, fields) => ({
  id,
  email: fields.email,
  unique_link_short: fields.unique_link_short,
})

// Transform the response from AT on order table into the GraphQL schema
const OrderTransformResponse = (id, fields) => ({
  id,
  email: fields.email,
  order_id : fields.order_id,
  payment_status : fields.payment_status,
  order_date: fields.order_date,
  payment_date: fields.payment_date,
  order_total_inc_tax: fields.order_total_inc_tax,
  payment_method: fields.payment_method[0],
  shipment_date: fields.shipment_date,
  order_closed: fields.order_closed,
})

const BrandTransformResponse = (id, fields) => ({
  id,
  brand_id: fields.brand_id,
  brand_image_url: fields.brand_image_url,
  brand_name: fields.brand_name,
  brand_mixmatch_moq: fields.brand_mixmatch_moq,
  title: fields.title,
})

const CollectionTransformResponse = (id, fields) => ({
  id,
  banner_image: fields.banner_image[0]['url'],
  banner_title: fields.banner_title,
  banner_description: fields.banner_description,
  collection_name: fields.collection_name,
  collection_bc_id: fields.collection_bc_id,
})


exports.getAllProducts = getAllProducts
exports.addProduct = addProduct
exports.getProduct = getProduct
exports.getCustomer = getCustomer
exports.logOrder = logOrder
exports.getBrandProducts = getBrandProducts
exports.getCustomerOrders = getCustomerOrders
exports.getBrandsFromCollection = getBrandsFromCollection
exports.getCollections=getCollections

