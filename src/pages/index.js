import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { setCookie } from "cookies-next"
import useSWR from "swr"
import SEO from "../components/SEO"
import Search from "../components/Search"
import Card from "../components/Card"
import Footer from "../components/Footer"
import Loader from "../components/Loader"

const fetcher = (url, lang) =>
	fetch(`${url}?lang=${lang}`).then((res) => res.json())

export default function Home() {
	const router = useRouter()
	const { lang } = router.query
	const { data, error } = useSWR(["/api/language", lang], fetcher)

	const [search, setSearch] = useState("")
	const [complexity, setComplexity] = useState(2)
	const { query: filterQuery } = useRouter()

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleComplexity = (complexityValue) => {
		setComplexity(complexityValue)
		setCookie("complexity", complexityValue, {
			secure: true,
			sameSite: "strict"
		})
	}

	useEffect(() => {
		if (filterQuery.filter !== undefined) {
			setSearch("filter=" + filterQuery.filter)
		}
	}, [filterQuery.filter])

	//Handle the error state
	if (error) return <div>Failed to load</div>

	//Handle the loading state
	if (!data) return <Loader />

	let commands = JSON.parse(data)

	return (
		<div className="container container-sm">
			<SEO />
			<Search
				handleSearch={handleSearch}
				handleComplexity={handleComplexity}
			/>

			<main className="main">
				<div>
					{commands.map((card, index) => {
						{
							return (
								<Card
									key={index}
									data={card}
									query={search}
									complexity={complexity}
								/>
							)
						}
					})}
				</div>

				<Footer />
			</main>
		</div>
	)
}
