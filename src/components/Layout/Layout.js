import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
//import { useCartContext } from '../../../wrap-with-provider';
//import { CartButton, Cart } from '../shopping-cart/shopping-cart';
import * as styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: 1200, padding: `0 1rem` }}>
      {children}
    </div>
  )
}