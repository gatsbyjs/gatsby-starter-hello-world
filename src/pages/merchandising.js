import React from "react"
import { Router } from "@reach/router"
import AllCollections from "../components/Merchandising/AllCollections"
import CollectionName from "../components/Merchandising/CollectionName"

export default function Merchandising(props) {
  console.log(props)
  return (
      <Router basepath={`/merchandising`}>
        <AllCollections path={`/allcollections`} location={props.location}/>
        <CollectionName path={`/collections/:collectionName`} location={props.location}/>
      </Router>
  )
}