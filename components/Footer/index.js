import React from "react"
import Link from "next/link"

const Footer = () => {
	return (
		<div className="footer wh-100">
			<p>
				Made with <span>&hearts;</span> by{" "}
				<Link
					target="_blank"
					rel="noopener noreferrer nofollow"
					href="https://github.com/excalith/git-cheats">
					excalith
				</Link>
			</p>
		</div>
	)
}

export default Footer
