const React = require("react")
const Layout = require("./src/components/layout")
import { loadStripe } from "@stripe/stripe-js"



// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}