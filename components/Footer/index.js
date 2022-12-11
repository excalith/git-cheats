import React from "react"
import Link from "next/link"

const Footer = () => {
	return (
		<div className="footer wh-100">
			<p>
				Made with <span>&hearts;</span> by{" "}
				<Link href="https://github.com/excalith">excalith</Link>
			</p>
		</div>
	)
}

export default Footer
