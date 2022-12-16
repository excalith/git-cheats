import { AVAILABLE_LANGUAGES } from "../../gitcheats.config"

const API_URL = "http://localhost:3000/api/language?lang="

describe("Checking API For Each Language", () => {
	AVAILABLE_LANGUAGES.map((lang) => {
		it(`Language API for "${lang}" returns 200`, () => {
			cy.request(`${API_URL}${lang}`)
				.as("commands")
				.should((response) => {
					expect(response.status).to.eq(200)
				})
		})
	})
})
