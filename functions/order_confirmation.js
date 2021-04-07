const { logOrder } = require("./utils/airtable")

const HEADER = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type,X-XSRF-TOKEN,X-CSRF-TOKEN",
	"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",

}

/* Creates the log of the order in AT then creates the orer in Bigcommerce */
exports.handler = async (event, context, callback) => {
	var resp
	let order = JSON.parse(event.body)
	resp = await logOrder(order)
	
	/* -- Order is saved in AT --*/
	/* -- Workflow is triggered in Pipedream from AT --*/
	

	if (typeof resp !== "undefined") {

		sendBack = {
			statusCode: 200,
			headers: HEADER,
			body: JSON.stringify(resp),
		}

		return sendBack
	} else {
		sendBack = {
			statusCode: 400,
			headers: HEADER,
			body: "No order was created",
		}
		return sendBack
	}
}
