import React from "react"

export default () => {
  return (
    <div>
      <p>Hello World!</p>

      <footer style={{ position: "fixed", bottom: 0 }}>
        © {new Date().getFullYear()}, Built with {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}
