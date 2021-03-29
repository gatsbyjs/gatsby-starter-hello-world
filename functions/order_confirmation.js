
const { logOrder } = require('./utils/airtable')

const HEADER = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : 'Content-Type,X-XSRF-TOKEN,X-CSRF-TOKEN'}

/* Creates the log of the order in AT then creates the orer in Bigcommerce */
exports.handler = async (event, context, callback) => {
	var resp;
	let order=JSON.parse(event.body);
	resp= await logOrder(order);
	/* -- Order is saved in AT --*/
	if (typeof resp !== 'undefined') {
	
	sendBack = {
		statusCode: 200,
		headers: HEADER,
		body: JSON.stringify(resp)
	}
	return sendBack
	}	
	
	/* Create the cart */





	/* Places the order with the cart created - 2s delay to allow for coupon to create */



	else {
	sendBack = {
		statusCode: 400,
		headers: HEADER,
		body: "No order was created"
	}
	return sendBack
	}






	
}