import React from "react"
import HashLoader from "react-spinners/HashLoader"

const Loader = () => {
    return (
        <HashLoader
            className="position-absolute top-50 start-50 translate-middle"
            size="120px"
            color="#df8e1d"
        />
    )
}

export default Loader
