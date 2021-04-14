import React, { useState } from "react"
import { Link } from "gatsby"
import * as styles from "./Referral.module.css"


const Referral = (props) => {
  

  const [ispressed, setIspressed] = useState("COPY LINK")

  const path=`mailto:?cc=info@thegoodtrends.com&subject=We're%20referring%20you%20to%20The%20Good%20Trends
  &body=Hi%2C%0D%0A%0D%0AThank%20you%20for%20your%20continued%20business%20with%20us.%20We%20love%20your%20brand
  %20and%20think%20it%20would%20be%20a%20good%20fit%20for%20The%20Good%20Trends%2C%20the%20specialty%20wholesale%20
  platform%20dedicated%20to%20local%20food%20makers.%0D%0A%0D%0AWe're%20enjoying%20using%20their%20marketplace%20and%20
  think%20they%20could%20help%20you%20grow%20your%20wholesale.%20Here%20are%20some%20reasons%20to%20like%20them
  %3A%0D%0A%0D%0A1.%20The%20Good%20Trends%20is%20a%20highly%20curated%20marketplace%20and%20already%20a%20trusted%20resource
  %20for%20buyers%20seeking%20unique%2C%20higher%20quality%20gourmet%20foods.%0D%0A2.%20You'll%20have%20access%20to%20a
  %20huge%20network%20of%20similar%20buyers%0D%0A3.%20Every%20wholesale%20order%20gets%20free%20digital%20marketing%20to
  %20promote%20your%20brand%20around%20the%20retail%20store%0D%0A%0D%0APlus%2C%20when%20you%20apply%20using%20this%20email%20
  we'll%20get%20%2450%20credit%20and%20three%20times%20the%20normal%20rate%20of%20advertising%20on%20our%20next%20order%2C%20
  and%20you%20will%20NEVER%20pay%20a%20commission%20on%20our%20orders.%0D%0A%0D%0ATo%20take%20advantage%2C%20copy%20and%20
  paste%20the%20link%20below%20into%20a%20new%20browser%20tab%20and%20hit%20Enter%3A%0D%0A%0D%0A
  https%3A%2F%2Frefer.thegoodtrends.com%2F${props.link_code}%0D%0A%0D%0AAll%20the%20best!`

  return (
    <div className="content_container">
      <div className={styles.referral_container}>
        <div className={styles.referral_left}>
          <h3>Consolidate your local maker ordering</h3>
          <p>
            Save ordering time and reduce error by inviting makers with your unique referral link. You get $50 per new maker you invite.
          </p>
        </div>
        <div className={styles.referral_right}>
            <button
              className={styles.referral__button}
              onClick={() => {setIspressed("COPIED")
                navigator.clipboard.writeText(props.link)
              }}
            >
            {ispressed}
            </button>
          <a href={path} target="_blank">
            <button
              className={styles.referral__button}>
            SEND EMAIL
            </button>
          
          </a>
        </div>
      </div>
    </div>
  )
}

export { Referral as default }
