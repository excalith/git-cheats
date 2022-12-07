import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import SEO from "../components/SEO"
import Search from "../components/Search"
import Card from "../components/Card"
import Footer from "../components/Footer"
import Loader from "../components/Loader"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {   
	//Set up SWR to run the fetcher function when calling "/api/staticdata"
	//There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
	const { data, error } = useSWR("/api/staticdata", fetcher)
	const [ search, setSearch ] = useState("")
	const [ isAdvanced, setAdvanced ] = useState(false)
	const { query: filterQuery } = useRouter()

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleAdvanced = () => { 
		setAdvanced(!isAdvanced) 
	} 

	useEffect(() => {
		if (filterQuery.filter !== undefined) {
			setSearch("filter=" + filterQuery.filter)
		}
	}, [filterQuery.filter])

	//Handle the error state
	if (error) return <div>Failed to load</div>

	//Handle the loading state
	if (!data) return <Loader/>

	let commands = JSON.parse(data)

	return (
		<div className="container container-sm">
			<SEO/>
        	<Search handleSearch={handleSearch} handleAdvanced={handleAdvanced}/>
          
        	<main className="main">
        		<div>
        			{commands.map((card, index) => {
        				{
        					return (
        						<Card key={index} data={card} query={search} isAdvanced={isAdvanced}/>
        					)
        				}
        			})}
        		</div>

        		<Footer/>
        	</main>


		</div>
	)
}
