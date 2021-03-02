
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"


export default function Home({data}) {
	return ( 
		<div > Hello world people! 
		{data.allAirtable.edges.map(({ node }) => (
            <>
	            <h1>{node.data.name}</h1>
	            <img src={node.data.image_url_1} />
	        </>
		))}
		</div>
	)
}

export const query = graphql`
  {
    allAirtable(limit: 20) {
      totalCount
      pageInfo {
        currentPage
        hasNextPage
      }
      edges {
        node {
          data {
            image_url_1
            image_url_2
            name
          }
        }
      }
    }
  }
`