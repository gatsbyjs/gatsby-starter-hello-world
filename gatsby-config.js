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
			  `gatsby-plugin-sharp`,
			  '@stripe/stripe-js',
			  'use-shopping-cart',
			  'gatsby-plugin-emotion',
			  'gatsby-plugin-react-helmet',
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
			],
};
