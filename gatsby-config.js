/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
	plugins: [{
		resolve: 'gatsby-source-bigcommerce',
		options: {
			clientId: 'mwmzcbp13yp1s6ajmfl4v62ffvzy647',
			secret: '96tzy8jrt9es4zawebcpx4un08notxz',
			accessToken: '3kivmg0g3fyos4sbqo3fk4pvj0sp66w',
			storeHash: '42s5es9otw',
			endpoint: '/catalog/products',

			// OPTIONAL
			logLevel: 'info',
			nodeName: 'BigCommerceNode',
			apiVersion: 'v3',

			// Multiple endpoints in an object.
			endpoints: {
				BigCommerceProducts: "/catalog/products",
				BigCommerceCategories: "/catalog/categories",
			}
		}
	},	
	{
	    resolve: `gatsby-source-airtable`,
	    options: {
	      apiKey: `keyUM7mD5f4hp8yh0`, // may instead specify via env, see below
	      concurrency: 5, // default, see using markdown and attachments for more information
	      tables: [
	        {
	          baseId: `app1K0wx2fQSngaRX`,
	          tableName: `product_catalog`,
	          // can leave off queryName, mapping or tableLinks if not needed
	        }
	      ]
	    }
	  },
	  `gatsby-transformer-sharp`, 
	  `gatsby-plugin-sharp`

	],
};
