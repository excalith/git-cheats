import React, { useState, useEffect } from "react"
import Link from "next/link"
import Code from "../Code"
import "@fontsource/rubik"
import { BsFillArrowUpRightSquareFill } from "react-icons/bs"

const Card = ({ data, query, isAdvanced }) => {
	const [isHidden, setHidden] = useState(false)

	let link = "https://git-scm.com/docs/git-" + data.name
	let category = data.category.toLowerCase()

	useEffect(() => {
		if (!isAdvanced && data.isAdvanced) {
			setHidden(true)
			return
		}

		if (query) {
			setHidden(!data.keywords.includes(query))
		} else {
			setHidden(false)
		}
	}, [query, isAdvanced, data.keywords, data.isAdvanced]),
		[isHidden]

	return (
		<div className={isHidden ? "card hidden" : "card"}>
			<div className={`mh-100 card-accent ${category}`}></div>
			<div className="card-content">
				<div className="card-body">
					<h1 className="card-title">
						<Link
							href={link}
							className="documentation-link"
							target="_blank"
							rel="noopener noreferrer nofollow">
							{data.name}
							<BsFillArrowUpRightSquareFill className="documentation-icon" />
						</Link>
					</h1>
					<p className={`card-category ${category}`}>{data.category}</p>
					<p className="card-description">{data.description}</p>
					<h5 className="card-usage">Usage:</h5>
					<div>
						{data.usage.map((usage, index) => {
							{
								return <Code key={index} usage={usage} showAdvanced={isAdvanced} />
							}
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
