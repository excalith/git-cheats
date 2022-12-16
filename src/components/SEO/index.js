import Head from "next/head"

const SEO = () => {
	const title = "Git Cheats • Interactive Git Cheatsheet"
	const description = "Git Cheats helps you to find the most common commands and shows usages in a user-friendly way."
	// const socialImage = "https://cancellek.com/social-image.png"

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			{/* {socialImage && <meta property="image" content={socialImage} />} */}
			<meta property="og:title" content={title} key="title" />
			<meta property="og:description" content={description} key="description" />
			{/* {socialImage && <meta property="og:image" content={socialImage} key="image" />} */}

			<meta name="twitter:title" content={title} key="title" />
			<meta name="twitter:description" content={description} key="description" />
			{/* {socialImage && <meta name="twitter:image" content={socialImage} key="image"/>} */}

			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
