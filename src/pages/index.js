import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <ul>
        {data.allMdx.edges.map(({ node }) => (
          <li key={node.id}>
            <h3>
              <Link to={node.fields.slug}>
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </Link>
            </h3>
            <p>{node.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMdx {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
