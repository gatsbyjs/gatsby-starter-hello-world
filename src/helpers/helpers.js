

export const minPrice = priceBySize => {
	return Math.min(...priceBySize.map(({ price }) => parseFloat(price)))
}


export const brandsInCart = (cart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return acc.includes(cart[cur]["brand_id"])
			? acc
			: acc.concat(cart[cur]["brand_id"])
	}, [])
}

// Sums the quantity for a given brand in cart
export const cartBrandQty = (cart, brand_id) => {
	if (cart == null) {
		return null
	}
	return Object.keys(cart).reduce((acc, cur) => {
		return cart[cur]["brand_id"] === brand_id
			? acc + cart[cur]["quantity"]
			: acc
	}, 0)
}


// Sums the shipping for a given brand in cart
export const cartBrandShipping = (cart, brand_id) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return cart[cur]["brand_id"] === brand_id
			? acc + cart[cur]["shipping"] * cart[cur]["quantity"]
			: acc
	}, 0)
}

// Sums the subtotal wholesale price
export const cartBrandSubtotal = (cart, brand_id) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return (cart[cur]["brand_id"] === brand_id)
			? acc + cart[cur]["price"] * cart[cur]["quantity"]
			: acc
	}, 0)
}

// Sums the total price
export const cartBrandTotal = (cart, brand_id) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return cart[cur]["brand_id"] === brand_id
			? acc +
					(cart[cur]["price"] + cart[cur]["price_data"]) * cart[cur]["quantity"]
			: acc
	}, 0)
}

export const cartAboveMOQ = (cart, brandMinimums) => {
	return Object.keys(brandMinimums).reduce((acc, cur) => {
		return (
			acc &&
			((cartBrandQty(cart, cur) >= brandMinimums[cur]) ||
				(cartBrandQty(cart, cur) === 0))
		)
	}, true)
}

// Sums the wholesale price in the cart
export const cartWholesaleTotal = (cart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return acc + cart[cur]["price"]* cart[cur]["quantity"]
	}, 0)
}

// Sums the total quantity in the cart
export const cartQtyTotal = (cart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return acc + cart[cur]["quantity"]
	}, 0)
}


// Sums the shipping price in the cart
export const cartShippingTotal = (cart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return acc + cart[cur]["shipping"]* cart[cur]["quantity"]
	}, 0)
}

// Sums the total price in the cart
export const cartTotal = (cart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		return acc + (cart[cur]["shipping"] + cart[cur]["price"]) * cart[cur]["quantity"]
	}, 0)
}

// Returns 'case' with an s depending on plurality
export const caseClean = (number) => {
	if (number > 1) {
		return "cases"
	}
	else {
		return "case"
	}
}

// Returns a BigCommerce order payload based on cartDetails and customer id
export const createPayload = (cart,customer_id) => {
	""
}


