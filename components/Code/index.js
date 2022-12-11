import React, { useEffect, useState } from "react"
import { IoCopy } from "react-icons/io5"
import "@fontsource/fira-code"

const CodeBlock = ({ usage, showAdvanced }) => {
	const [isHidden, setHidden] = useState(false)
	const code = "git " + usage.code

	useEffect(() => {
		setHidden(!showAdvanced && usage.isAdvanced)
	}, [showAdvanced, usage.isAdvanced])

	const handleCopy = () => {
		navigator.clipboard.writeText("git " + usage.code)
	}

	return (
		<div className={isHidden ? "code-block hidden" : "code-block"}>
			<pre>
				<div className="code-row row g-0">
					<code className="col d-sm-flex">{code}</code>
					<button
						className="btn btn-default col-md-1"
						onClick={handleCopy}>
						<IoCopy />
					</button>
				</div>
			</pre>
			<p className="code-description">{usage.description}</p>
		</div>
	)
}

export default CodeBlock
