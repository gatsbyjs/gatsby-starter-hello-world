import React from "react"
import Header from "../components/header"
import {Link} from "gatsby"

export default function Home() {
  return (
    <div style={{ color: 'red'}}>
      <Header headerText="Home"></Header>
      <Link to="/about/">About</Link>
     <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  ); 
  
  
}
