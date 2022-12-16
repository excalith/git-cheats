import React, { useState } from "react"
import { IoCopy } from "react-icons/io5"
import "@fontsource/fira-code"

const CopyButton = ({ usage }) => {
	const [isHidden, setHidden] = useState(true)

	const handleCopy = (event) => {
		setHidden(false)
		navigator.clipboard.writeText(usage)
		setTimeout(
			function () {
				setHidden(true)
			}.bind(this),
			1000
		)
	}

	return (
		<div className="copy-button-wrapper">
			<button className={isHidden ? "btn btn-default" : "btn btn-default active"} onClick={handleCopy}>
				<IoCopy />
			</button>
			<span className={isHidden ? "tooltip" : "tooltip active"}>Copied</span>
		</div>
	)
}

export default CopyButton
