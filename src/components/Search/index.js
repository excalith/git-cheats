import React, { useRef, useEffect } from "react"
import { hasCookie, getCookie } from "cookies-next"

const Search = ({ data, handleSearch, handleComplexity, ...rest }) => {
	const searchElement = useRef(null)
	const complexityElement = useRef(null)

	useEffect(() => {
		if (searchElement.current) {
			searchElement.current.focus()
		}

		if (complexityElement.current) {
			let complexityCookie = hasCookie("complexity", {
				secure: true,
				sameSite: "strict"
			})
				? getCookie("complexity", {
						secure: true,
						sameSite: "strict"
				  })
				: 2
			complexityElement.current.value = complexityCookie
			handleComplexity(complexityCookie)
		}
	}, [])

	const changeComplexity = (e) => {
		complexityElement.current.value = e.target.value
		handleComplexity(e.target.value)
	}

	return (
		<div className="sticky-top search-row">
			<input
				className="form-control search-bar"
				type="text"
				onChange={handleSearch}
				placeholder="Search"
				autoFocus
				ref={searchElement}
			/>
			<select
				className="search-complexity form-select form-select-lg mb-3"
				onChange={changeComplexity}
				ref={complexityElement}>
				{data.map((item, index) => {
					return (
						<option key={index} value={index}>
							{item}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Search
