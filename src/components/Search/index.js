import React, { useRef, useEffect } from "react"

const Search = ({ handleSearch, handleAdvanced, ...rest }) => {
	const inputElement = useRef(null)

	useEffect(() => {
		if (inputElement.current) {
			inputElement.current.focus()
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
				ref={inputElement}
			/>
			<div className="btn-group search-advanced" role="group">
				<input
					type="checkbox"
					className="btn-check"
					id="advanced-check"
					autoComplete="off"
					data-bs-toggle="tooltip"
					data-bs-placement="left"
					data-bs-title="Tooltip on left"
					onChange={handleAdvanced}
				/>
				<label
					className="btn btn-outline-warning"
					htmlFor="advanced-check">
					Advanced
				</label>
			</div>
		</div>
	)
}

export default Search
