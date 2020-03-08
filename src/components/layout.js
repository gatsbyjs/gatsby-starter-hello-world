import React from "react"
import { Link } from "gatsby"

export default ({ children }) => (
  <React.Fragment>
    <h1>
      <Link to="/">Hello Gatsby MDX</Link>
    </h1>
    {children}
  </React.Fragment>
)
