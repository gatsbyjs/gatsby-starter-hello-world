import React, { useState } from "react"
import { Link } from "gatsby"
import * as styles from "./SelectionBar.module.css"
import { AppBar, Tabs, Tab}  from '@material-ui/core';
import { PhoneIcon, FavoriteIcon, PersonPinIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';




const SelectionBar = (props) => {
  

  const tabsStyles = makeStyles({
    root: {
      background: 'white',
      border: 0,
      fontColor: 'black',
      width: '100%',
      borderBottom : '2px solid black',
      borderTop : '1px solid #EEEEEE',
      color : 'black',
      fontColor : 'black',
    },
    scrollButtons : {
      background: 'black',
      color:'white',
      fontWeight: 'bold',
    }
    },
  )();

  const tabStyles = makeStyles({
    root: {
      background: 'white',
      fontColor: 'black',
      textColor : 'black !important',
      fontSize: '18px',
    },
    label : {
      textColor : 'black !important',
    },
    },
  )();


    return (
      <div className="content_container">
      <div style={{borderTop : '2px solid black',textAlign: 'center', paddingTop : '-30px'}}> 
       <span style={{fontWeight: 'bold', fontSize : '18px'}}>Quick start</span>
       <Tabs classes={tabsStyles}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        >
          <Link to={`/customer/${props.email}/`}><Tab classes={tabStyles} label="Track Orders"/></Link>
          <Tab classes={tabStyles} label="Invoices" />
          <Tab classes={tabStyles} label="Change store" />
          <Tab classes={tabStyles} label="Summer Collection" />
          <Tab classes={tabStyles} label="All Collections" />
          <Tab className={tabStyles.root} label="All Collections" />
        </Tabs>
      </div>
      </div>
    )
}

export { SelectionBar as default }
