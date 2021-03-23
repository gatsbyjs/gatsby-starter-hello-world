import React, { useState, useEffect, useRef } from "react"

export function usePrevious(value) {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	if (typeof ref.current === "undefined") {
		return 0
	} else {
		return ref.current
	}
}