const Airtable = require('airtable')

const reorder_base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_REORDER_ID)

const reorder_table= reorder_base(process.env.AIRTABLE_TABLE_REORDER_REORDERS)


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

exports.logOrder = logOrder


