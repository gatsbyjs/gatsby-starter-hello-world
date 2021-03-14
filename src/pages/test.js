import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/Products/Products"

const AdvancedExamplePage = () => (
  <Layout>
    <SEO title="Advanced Example" />
    <h1>This is the advanced example</h1>
    <Products />
  </Layout>
)
export default AdvancedExamplePage