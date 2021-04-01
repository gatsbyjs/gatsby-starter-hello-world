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
    await next({opacity: 1, color: '#ff5757',delay:1,fontWeight: 'bold',fontSize: '1.2em'})
    await next({opacity: 1, color: 'rgb(14,26,19)',fontWeight: 'normal',fontSize: '1em'})
  }})


	return (
	<span style={{ fontSize: `0.8em` }}>
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
