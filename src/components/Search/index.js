import React, { useRef, useEffect } from "react"

const Search = ({ handleSearch, handleComplexity, ...rest }) => {
	const searchElement = useRef(null)
	const complexityElement = useRef(null)

	useEffect(() => {
		if (searchElement.current) {
			searchElement.current.focus()
		}
		if (complexityElement.current) {
			complexityElement.current.value = 2
		}
	}, [])

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
				onChange={handleComplexity}
				ref={complexityElement}>
				<option value="1">Basic</option>
				<option value="2">Normal</option>
				<option value="3">Advanced</option>
			</select>
		</div>
	)
}

export default Search
