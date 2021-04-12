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
	type Query {
		getProducts: [Product]
		getProduct(id: ID!): Product
		addProduct(product: ProductInput): Product
		getCustomer(email: String!): Customer
		getBrandProducts(brand_id: String!): [BrandProduct]
		allStores: [Store]
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
`
exports.typeDefs = typeDefs
