
import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Checkout from "../components/checkout"

export default function ErrorPage ({props}) {
  return ( 
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <h1>This is an error page </h1>
    </Layout>
    )
  }

