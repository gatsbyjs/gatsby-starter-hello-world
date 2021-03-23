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
	siteUrl: `http://localhost:8888/`,
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
		      apiKey: process.env.AIRTABLE_API_KEY,
		      concurrency: 5, // default, see using markdown and attachments for more information
		      tables: [
		        {
		          baseId: process.env.AIRTABLE_BASE_MERCHANDISING_ID,
		          tableName: `product_catalog`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: process.env.AIRTABLE_BASE_CUSTOMER_ID,
		          tableName: `customers`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: process.env.AIRTABLE_BASE_MERCHANDISING_ID,
		          tableName: `brand_catalog`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: process.env.AIRTABLE_BASE_REORDER_ID,
		          tableName: `reorders`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: process.env.AIRTABLE_BASE_REORDER_ID,
		          tableName: `ordered_brands`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        },
		        {
		          baseId: process.env.AIRTABLE_BASE_REORDER_ID,
		          tableName: `ordered_products`,
		          // can leave off queryName, mapping or tableLinks if not needed
		        }
		      ]}},
		     //  {
			    //   resolve: `gatsby-source-mysql`,
			    //   options: {
			    //     connectionDetails: {
			    //       client: 'pg',
			    //       host: 'good-trends-db.cyihl0iyg8xl.us-east-1.rds.amazonaws.com',
			    //       port: 5432,
			    //       user: 'good_trends_user',
			    //       password: 'PuUJ4NH9Af7',
			    //       database: 'good_trends_db',
			    //       //ssl  : {
    			// 		//ca : fs.readFileSync(__dirname + '/mysql-ca.crt')

			    //     	},
			    //     queries: [
			    //       {
			    //         statement: 'SELECT * FROM bigcommerce_sellerproductorder',
			    //         idFieldName: 'Id',
			    //         name: 'sorder'
			    //       }
			    //     ]
			    //   }
			    // },
			  // {
		   //    resolve: "gatsby-source-pg",
		   //    options: {
			  //       connectionString: "postgres://good_trends_user:PuUJ4NH9Af7@good-trends-db.cyihl0iyg8xl.us-east-1.rds.amazonaws.com:5432/good_trends_db",
			  //       schema: "public",
			  //       appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
			  //     },
			  // },
			  // Design & speed load time
			  'gatsby-plugin-sass',
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
			    // {
			    //   resolve: `gatsby-plugin-modal-routing`,
			    //   options: {
			    //     // A selector to set react-modal's app root to, default is `#___gatsby`
			    //     // See http://reactcommunity.org/react-modal/accessibility/#app-element
			    //     appElement: '#___gatsby',

			    //     // Object of props that will be passed to the react-modal container
			    //     // See http://reactcommunity.org/react-modal/#usage
			    //     modalProps: { },
			    //   }
			    // },
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
