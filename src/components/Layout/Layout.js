import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as styles from "./Layout.module.css"
import { useShoppingCart } from "use-shopping-cart"
import logo from "./images/logo.png"
import numeral from "numeral"
import { cartWholesaleTotal, cartQtyTotal } from "../../helpers/helpers"
import {useSpring, animated} from 'react-spring'
import Totals from "./Totals"

export default function Layout({ children, location, email, brand_id }) {
	const path = location.pathname;

	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	const props = useSpring({opacity: 1, from: {opacity: 0}})

	const { cartDetails } = useShoppingCart()

	return (
		<div className={styles.layout}>
			<header className={styles.layout__header}>
				<div className={styles.layout__headerleft}>
					<div >
						{!(
							typeof brand_id == "undefined" &&
							!location.pathname.includes("cart")
						) && (
							<Link to={`/customer/${email}`} style={{ align: `left` }}>
								<h4 className={styles.layout__headerText}>&#60; Brands</h4>
							</Link>
						)}
					</div>
				</div>

				<div
					style={{ display: `flex`, width: `33%`, justifyContent: `center` }}
				>
					<div>
						<Link to={`/customer/${email}`}>
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
					<div>
						<Link to={`/customer/${email}/cart`}>
							<h4 className={styles.layout__headerText_right}>Cart</h4>
							<Totals 
							wholesale={cartWholesaleTotal(cartDetails)}
							units={cartQtyTotal(cartDetails)}
							/>
						</Link>
					</div>
				</div>
			</header>
			<div style={{ margin: `0 auto`, maxWidth: 1200, padding: `0 0rem` }}>
				{children}
			</div>
		</div>
	)
}
