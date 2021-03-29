const Airtable = require('airtable')

const { AIRTABLE_API_KEY } = process.env
const { AIRTABLE_BASE_CUSTOMER_ID } = process.env
const at_base = new Airtable({
		apiKey: AIRTABLE_API_KEY
	})
	.base(AIRTABLE_BASE_CUSTOMER_ID)
const at_table_products = at_base('customers')
const HEADER = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : 'Content-Type,X-XSRF-TOKEN,X-CSRF-TOKEN'}



exports.handler = async (event, context, callback) => {
	const qs_val_recid='all'
	const customer_id = event.queryStringParameters.customer_id
	var resp, sendBack

	try {
		// https://community.airtable.com/t/variable-in-filterbyformula/2251
		filterFormula = "( {Customer ID} = '" + customer_id + "')";

		console.log('record id: ' + qs_val_recid)

		if ( typeof qs_val_recid !== 'undefined' && qs_val_recid !== '' && qs_val_recid !== 'all' ) {
			resp = await at_table_products.find(qs_val_recid);
		} else if (qs_val_recid === 'all') {
			resp = await at_table_products.select({
					maxRecords: 1,
					filterByFormula: filterFormula,
					// sort: [{field: 'Year'}]
				})
				.firstPage()
		}

		if (typeof resp !== 'undefined') {
			sendBack = {
				statusCode: 200,
				headers: HEADER,
				body: JSON.stringify({ 'link' : resp[0]['fields']['unique_link_short']})
			}

			console.log('...a bunch of good data...')
		} else {
			sendBack = {
				statusCode: 204,
				headers: HEADER,
				body: JSON.stringify({ 'link' : 'You do not have a referral link yet.'})
			}

			console.log(sendBack)
		}

		return sendBack
	} catch {
		
		return {
			statusCode: 200,
			headers: HEADER,
			body: JSON.stringify({ 'link' : 'You do not have a referral link yet.'})
		}
	}
}