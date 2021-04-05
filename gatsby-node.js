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

  results.data.ordered_brands.edges.forEach(({ node }) => {
    createPage({
      path: 'customer/'+node.data.email+'/order-confirmation',
      component: path.resolve(`./src/pages/cart/order-confirmation.js`),
      context: {
        email: node.data.email,
      },
    });
  });

}


exports.onCreatePage = async ({ page, actions}) => {
    //page.path matches with regex pattern: start with '/dashboard'
    if (page.path.match(/^\/dashboard/) {
        page.matchPath = '/dashboard/*' // page.matchPath is used for matching pages only on client side
        createPage(page)
    }
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
