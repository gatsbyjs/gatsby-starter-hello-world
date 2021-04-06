import React, { useState } from "react"
import numeral from "numeral"
import {caseClean} from "../../helpers/helpers"
import {useSpring, animated} from 'react-spring'
import { usePrevious } from "../../hooks/usePrevious"


export default function Layout({wholesale, units}) {

const [ws]=useState(wholesale)

const prevWS = usePrevious(ws)

const changed=(wholesale != prevWS)

const props = useSpring({
  to: async (next, cancel) => {
    await next({opacity: 1, color: 'black',fontWeight: 'bold',fontSize: '1.1em'})
    await next({opacity: 1, color: 'black',fontWeight: 'normal',fontSize: '1em'})
  }})


	return (
	<span style={{ fontSize: `0.7em` }}>
	{ changed ?
	<animated.span style={props}>
		{wholesale != 0 &&
			`${numeral(wholesale).format(
				"$0,0.00"
			)} | ${units} ${caseClean(units)}`}
	</animated.span>
	: 	<span style={props}>
		{wholesale != 0 &&
			`${numeral(wholesale).format(
				"$0,0.00"
			)} | ${units} ${caseClean(units)}`}
	</span>}
	</span>
	)
}
