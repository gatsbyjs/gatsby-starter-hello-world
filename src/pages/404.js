
import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

export default function ErrorPage ({props}) {
  return ( 
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <h1>This is an error page </h1>
    </Layout>
    )
  }

