
const { logOrder } = require('./utils/airtable')

const HEADER = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : 'Content-Type,X-XSRF-TOKEN,X-CSRF-TOKEN'}

exports.handler = async (event, context, callback) => {

	const order=JSON.parse(event.body)
	resp=logOrder(order)
	if (typeof resp !== 'undefined') {
	sendBack = {
		statusCode: 200,
		headers: HEADER,
		body: JSON.stringify(resp)
	}
	return sendBack
	}	
	else {
	sendBack = {
		statusCode: 400,
		headers: HEADER,
		body: "No order was created"
	}
	return sendBack
	}




	
 }