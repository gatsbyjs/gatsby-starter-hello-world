/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
	siteUrl: `https://reorder.thegoodtrends.com/`,
    title: 'The Good Trends Reorder',
    description:
      'This site is to help customers reorder fast and efficiently from The Good Trends.'
  	},
  	// Plugins starting with datasources
	plugins: [{
		      resolve: `gatsby-plugin-create-client-paths`,
		      options: { prefixes: [`/brandselection/*`] },
		    },
		    // Required for data
			{
		    resolve: `gatsby-source-airtable`,
		    options: {
		      apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
		      concurrency: 5, // default, see using markdown and attachments for more information
		      tables: [
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_MERCHANDISING_ID,
		          tableName: `product_catalog`,
		        },
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_CUSTOMER_ID,
		          tableName: `customers`,
		        },
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_MERCHANDISING_ID,
		          tableName: `brand_catalog`,
		        },
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_REORDER_ID,
		          tableName: `ordered_brands`,
		        },
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_REORDER_ID,
		          tableName: `ordered_products`,
		        },
		        {
		          baseId: process.env.GATSBY_AIRTABLE_BASE_REORDER_ID,
		          tableName: `reorders`,
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
				{
			      resolve: `gatsby-source-stripe`,
			      options: {
			        objects: ["Price"],
			        secretKey: process.env.GATSBY_STRIPE_SECRET_KEY,
			        downloadFiles: false,
			      },
			    },
			  'use-shopping-cart',
			  '@emotion/react',
			  
			  // Sets manifest to add to mobile https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest
			  {
		      resolve: `gatsby-plugin-manifest`,
		      options: {
			        name: `The Good Trends`,
			        short_name: `The Good Trends`,
			        start_url: `/`,
			        background_color: `#f7f0eb`,
			        theme_color: `#ff5757`,
			        display: `standalone`,
			        icon: `src/images/logosquare.png`,
			      },
   			  }, 
			  // Improve offline resilience
			  `gatsby-plugin-offline`,
			  'gatsby-plugin-sitemap',
			  {
			    resolve: `gatsby-plugin-netlify`,
			    options: {
			      headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
			      allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
			      mergeSecurityHeaders: true, // boolean to turn off the default security headers
			      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
			      mergeCachingHeaders: true, // boolean to turn off the default caching headers
			      transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
			      generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
			    },
			  },
			],
};
