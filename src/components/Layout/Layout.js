import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import * as styles from './Layout.module.css';
import { useShoppingCart } from 'use-shopping-cart';




export default function Layout({ children, location, pageContext }) {
	const path = location.pathname;
	const { brand_id, email } = pageContext;
	const data = useStaticQuery(graphql`
	    query {
	        site {
	            siteMetadata {
	                title
	            }
	        }
	    }  
	`)  
  
  const { cartDetails } = useShoppingCart()
  
  return (
  	<div className={styles.layout}>
	    <header className={styles.layout__header}>
	        <div style={{ display: `flex` }}>
	            { !(typeof brand_id == "undefined") && (
	            <Link to={`/customer/${email}`}>
	                <h2 className={styles.layout__headerText}>
	                &#60; Back 
	                </h2>
	            </Link>)
	        }
	        </div>	        


	        <div style={{ display: `flex` }}>
	            <Link to={`/customer/${email}`}>
	                <img src="./images/logo.png"</img>
	            </Link>
	        </div>
	       	<div style={{ display: `flex`, align : 'right' }}>
	            <Link to="/cart">
	                <h2 className={styles.layout__headerText}>
	                    Cart
	                </h2>
	            </Link>
	        </div>
	    </header>
	    <div style={{ margin: `0 auto`, maxWidth: 1200, padding: `0 1rem` }}>
	      {children}
	    </div>
	</div>
  )
}