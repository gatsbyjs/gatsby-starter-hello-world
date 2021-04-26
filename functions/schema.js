const { gql } = require("apollo-server-lambda")

// Defines the types of products sent by graph QL
const typeDefs = gql`
	type Product {
		id: ID
		name: String
		description: String
	}
	type BrandProduct {
		id: ID
		name: String
		price: String
		product_id: String
		image_url_1: String
		product_average_local_shipping: String
		product_wholesale_price: String
		title: String
		is_in_stock: String
	}
	type Customer {
		email: String
		unique_link_short: String
		lead: String
	}
	input ProductInput {
		name: String
		description: String
	}
	type StorePage {
		data: [Store]!
		after: String
		before: String
	}
	type Adress {
		street: String
		city: String
		state: String
		zipcode: String 
	}	
	type Store {
		_id: ID!
		name: String!
		address: Adress
	}
	type Order {
		email: String!
		order_id: Int
		order_date: String
		payment_date: String
		payment_method: String
		order_total_inc_tax: Float
		payment_status: String
		shipment_date: String
		order_closed: String
	}
	type Brand {
	    brand_id: String
        brand_image_url: String
        brand_name: String!
        brand_mixmatch_moq: Int
        title: String
	}
	type Collection{
	  banner_image: String,
	  banner_title: String,
	  banner_description: String,
	  collection_name: String,
	  collection_bc_id: String,
	}
	type Query {
		getProducts: [Product]
		getProduct(id: ID!): Product
		addProduct(product: ProductInput): Product
		getCustomer(email: String!): Customer
		getBrandProducts(brand_id: String!): [BrandProduct]
		allStores: [Store]
		getCustomerOrders(email: String!): [Order]
		getBrandsFromCollection(collection_name: String!): [Brand]
		getCollections: [Collection]
	}
`
exports.typeDefs = typeDefs
