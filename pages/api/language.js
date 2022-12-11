// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://vercel.com/guides/loading-static-file-nextjs-api-route
import path from "path"
import { promises as fs } from "fs"
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from "../../gitcheats.config"

export default async function handler(req, res) {
	// Only GET Method allowed
	if (req.method != "GET") res.status(405).end()

	// Set default language
	let language = DEFAULT_LANGUAGE

	// Check query for a valid language
	if (
		req.query.lang != "undefined" &&
		AVAILABLE_LANGUAGES.includes(req.query.lang)
	) {
		language = req.query.lang
	}

	//Find the absolute path of the json directory
	const dataDirectory = path.join(process.cwd(), "data/language")

	//Read the json data file data.json
	const fileContents = await fs.readFile(
		dataDirectory + "/" + language + ".json",
		"utf8"
	)

	//Return the content of the data file in json format
	res.status(200).json(fileContents)
}
