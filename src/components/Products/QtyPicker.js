import React, { useState, useEffect } from 'react';
import numeral from 'numeral';
import { Link } from 'gatsby';
import Img from "gatsby-image";
import "./styles/QtyPicker.scss";
import { usePrevious } from "../../hooks/usePrevious"


const QtyPicker = ({ pcount, setPcount }) => {
    
  const [count, setCount] = useState(pcount);

  const prevCount = usePrevious(count)

  const increment = () => {
    let new_count=count+1; 
    setCount(new_count)
  }
  
  const decrement = () => {
    let new_count=count > 0? (count-1) : 0; 
    setCount(new_count)
  }

  useEffect(() => {
      if (count != prevCount) {
      setPcount(count);
      }
  }, [count]);
  
    return (
      <div className="quantity-input">
        <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
          &mdash;
        </button>
        <input className="quantity-input__screen" type="text" value={count} readOnly />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
          &#xff0b;
        </button>  
      </div>  
    )
}

export { QtyPicker as default };