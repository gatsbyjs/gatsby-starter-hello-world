import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as styles from "./Layout.module.css"
import { useShoppingCart } from "use-shopping-cart"
import logo from "./images/logo.png"
import numeral from "numeral"
import { cartWholesaleTotal, cartQtyTotal } from "../../helpers/helpers"

export default function Layout({ children, location, pageContext }) {
	const path = location.pathname

	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<div className={styles.layout}>
			<header className={styles.layout__header}>
				<div style={{ display: `flex`, width: `33%`, justifyContent: `left` }}>
					<div>

					</div>
				</div>

				<div
					style={{ display: `flex`, width: `33%`, justifyContent: `center` }}
				>
					<div>
						<Link to={`/`}>
							<img className={styles.layout__headerLogo} src={logo} />
						</Link>
					</div>
				</div>
				<div
					style={{
						display: `flex`,
						width: `33%`,
						justifyContent: `right`,
						flexDirection: `row-reverse`,
					}}
				>
				</div>
			</header>
			<div style={{ margin: `0 auto`, maxWidth: 1200, padding: `0 1rem` }}>
				{children}
			</div>
		</div>
	)
}
