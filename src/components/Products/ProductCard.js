import React from 'react';
import numeral from 'numeral';
import { Link } from 'gatsby';
import Img from "gatsby-image";
import * as pstyles from "./ProductCard.module.css"

const ProductCard = ({ product }) => {
    return (
        <div className={pstyles.productItem}>
            <Link to={product.name}>
                <img 
                    src={product.image_url_1}
                    alt={product.name}
                    style={{margin: `0 0 0.25rem 0`}}
                />
                <p className={pstyles.productItem__text}>{product.name}</p>
                <p className={`${pstyles.productItem__text} ${pstyles.productItem__textLight}`}>
                   {numeral(product.mrrp).format('$0,0.00')}
                </p>
            </Link>
        </div>
    )
}

export { ProductCard as default };