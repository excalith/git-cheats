// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://vercel.com/guides/loading-static-file-nextjs-api-route
import path from "path"
import { promises as fs } from "fs"
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from "../../../gitcheats.config"

export default async function handler(req, res) {
	// Only GET method is allowed
	if (req.method != "GET") {
		res.status(405).end()
		return
	}

	// Get requested language
	let queryLang = req.query.lang

	// Set default language
	let language = DEFAULT_LANGUAGE

	// Check query language if valid. Else, continue with default language
	if (queryLang != "undefined" && AVAILABLE_LANGUAGES.includes(queryLang)) {
		language = queryLang
	}

	// Find the absolute path of the json directory
	const dataDirectory = path.join(process.cwd(), "static/language")

	// Read the json data file data.json
	const fileContents = await fs.readFile(dataDirectory + "/" + language + ".json", "utf8")

	// Return the content of the data file in json format
	res.status(200).json(fileContents)
}
