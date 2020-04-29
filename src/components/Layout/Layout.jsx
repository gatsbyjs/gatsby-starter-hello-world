import React from "react"
import { css } from "emotion"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <main
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {children}
    </main>
  )
}

export default Layout
