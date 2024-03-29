import React, { useEffect, useState } from "react"
import "@fontsource/fira-code"
import CopyButton from "../CopyButton"

const CodeBlock = ({ usage, complexity }) => {
	const [isHidden, setHidden] = useState(false)
	const usageCode = "git " + usage.code

	useEffect(() => {
		setHidden(usage.complexity > complexity)
	}, [complexity, usage.complexity])

	return (
		<div className={isHidden ? "code-block hidden" : "code-block"}>
			<pre>
				<div className="code-row row g-0">
					<code className="col d-sm-flex">{usageCode}</code>
					<CopyButton usage={usageCode} />
				</div>
			</pre>
			<p className="code-description">{usage.description}</p>
		</div>
	)
}

export default CodeBlock
