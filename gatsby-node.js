const path = require(`path`)

// Creates the brand page at /{brand_id})
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  
  // Creates brand pages
  const results = await graphql(`
    query {
		  brands : allAirtable(filter: {table: {eq: "brand_catalog"}}) {
		    edges {
		      node {
		        data {
		          brand_id
		        }
		      }
		    }
		  }
      ordered_brands: allAirtable(filter: {table: {eq: "ordered_brands"}}) {
        edges {
          node {
            data {
              brand_id
              email
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  results.data.brands.edges.forEach(({ node }) => {
    createPage({
      path: String(node.data.brand_id),
      component: path.resolve(`./src/pages/brands/brand.js`),
      context: {
        brand_id: node.data.brand_id,
      },
    });
  });

  results.data.ordered_brands.edges.forEach(({ node }) => {
    createPage({
      path: 'customer/'+node.data.email,
      component: path.resolve(`./src/pages/reorder_index.js`),
      context: {
        email: node.data.email,
      },
    });
  });

  results.data.ordered_brands.edges.forEach(({ node }) => {
    createPage({
      path: 'customer/'+node.data.email+'/'+String(node.data.brand_id),
      component: path.resolve(`./src/pages/brands/reorder_brands.js`),
      context: {
        brand_id: node.data.brand_id,
        email: node.data.email,
      },
    });
  });
  
  results.data.ordered_brands.edges.forEach(({ node }) => {
    createPage({
      path: 'customer/'+node.data.email+'/cart',
      component: path.resolve(`./src/pages/cart/cart.js`),
      context: {
        email: node.data.email,
      },
    });
  });


}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
		  //crypto: require.resolve("crypto-browserify"),
       fallback: {
		    "fs": false,
		    "tls": false,
		    "net": false,
		    "path": false,
		    "zlib": false,
		    "http": false,
		    "https": false,
		    "stream": false,
		    "crypto": false,
       }
      }
    }
  )
}
