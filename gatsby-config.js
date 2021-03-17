/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// Sets the environment variable to test
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
	siteUrl: `ttps://btrtomorrow.netlify.app`,
    title: 'The Good Trends Reorder',
    description:
      'This site is to help customers reorder fast and successfully from THe Good Trends.'
  	},
  	// Plugins starting with datasources
	plugins: [{
		      resolve: `gatsby-source-stripe`,
		      options: {
		        objects: ["Price"],
		        secretKey: process.env.STRIPE_SECRET_KEY,
		        downloadFiles: false,
		      },
		    },	
			{
		    resolve: `gatsby-source-airtable`,
		    options: {
		      apiKey: process.env.AT_API_KEY, // may instead specify via env, see below
		      concurrency: 5, // default, see using markdown and attachments for more information
		      tables: [
		        {
		          baseId: `app1K0wx2fQSngaRX`,
		          tableName: `product_catalog`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: `appHryZ3YKQk6tYCR`,
		          tableName: `customers`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: `app1K0wx2fQSngaRX`,
		          tableName: `brand_catalog`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        }
		      ]}},
		      // {
			     //  resolve: `gatsby-source-mysql`,
			     //  options: {
			     //    connectionDetails: {
			     //      client: 'pg',
			     //      host: 'good-trends-db.cyihl0iyg8xl.us-east-1.rds.amazonaws.com',
			     //      port: 5432,
			     //      user: 'admin',
			     //      password: '?Welcome5',
			     //      database: 'good_trends_db',
			     //      //ssl  : {
    				// 	//ca : fs.readFileSync(__dirname + '/mysql-ca.crt')

			     //    	},
			     //    queries: [
			     //      {
			     //        statement: 'SELECT * FROM the_good_trends_app.bigcommerce_order',
			     //        idFieldName: 'id',
			     //        name: 'order'
			     //      }
			     //    ]
			     //  }
			    //},
			  // Design & speed load time
			  'gatsby-legacy-polyfills',
			  `gatsby-transformer-sharp`, 
			  `gatsby-plugin-sharp`,
			  'gatsby-plugin-emotion',
			  'gatsby-plugin-react-helmet',
			  {
			      resolve: `gatsby-plugin-typography`,
			      options: {
			      pathToConfigModule: `src/utils/typography`,
			      },
			    },
			  // Requires for cart management
			  '@stripe/stripe-js',
			  'use-shopping-cart',
			  'crypto',
			  'crypto-browserify',
			  '@emotion/react',
			  // Sets manifest to add to mobile https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest
			  {
		      resolve: `gatsby-plugin-manifest`,
		      options: {
			        name: `GatsbyJS`,
			        short_name: `GatsbyJS`,
			        start_url: `/`,
			        background_color: `#f7f0eb`,
			        theme_color: `#a2466c`,
			        display: `standalone`,
			        icon: `src/images/icon.png`,
			      },
   			  }, 
			  // Improve offline resilience
			  `gatsby-plugin-offline`,
			  'gatsby-plugin-sitemap',
			  'numeral',
			],
};
