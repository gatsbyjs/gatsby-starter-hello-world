const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page-template.js`)
  return graphql(
    `
      {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.edges

    posts.forEach(post => {
      createPage({
        path: post.node.fields.slug,
        component: pageTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
