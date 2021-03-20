const Airtable = require('airtable')
/** The next 2 lines refer to environment variables configured in Netlify settings (found in "Site settings > Build & deploy > Environment" as of this writing) */

const { AIRTABLE_API_KEY } = process.env
const { AIRTABLE_BASE_CUSTOMER_ID } = process.env
const at_base = new Airtable({
		apiKey: AIRTABLE_API_KEY
	})
	.base(AIRTABLE_BASE_CUSTOMER_ID)
const at_table_products = at_base('customers')

exports.handler = async (event, context, callback) => {
	const qs_val_recid ='all'
	const customer_id = event.queryStringParameters.customer_id
	var resp, sendBack

	try {
		// https://community.airtable.com/t/variable-in-filterbyformula/2251
		filterFormula = "( {Customer ID} = '" + customer_id + "')";

		console.log('record id: ' + customer_id)

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
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify(resp[0]['fields']['unique_link_short'])
			}

			console.log('...a bunch of good data...')
		} else {
			sendBack = {
				statusCode: 204,
				body: 'I got nada...'
			}

			console.log(sendBack)
		}

		return sendBack
	} catch (errObj) {
		const errBody = {
			'err_msg': errObj.message
		}

		console.log('Error (from catch): ');
		console.log(errObj);
		
		return {
			statusCode: errObj.statusCode,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(errBody)
		}
	}
}