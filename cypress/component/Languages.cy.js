import { AVAILABLE_LANGUAGES } from "../../gitcheats.config"

describe("Checking All Languages Files", () => {
	let reference

	AVAILABLE_LANGUAGES.map((lang) => {
		it(`Language for "${lang}" is valid`, () => {
			cy.readFile(`static/language/${lang}.json`, "utf-8").then((str) => {
				if (lang === "en") {
					reference = str
				} else {
					let hasSameKeys = checkFileIntegrity(reference, str)
					cy.expect(hasSameKeys).to.equal(
						true,
						`Language file "${lang}" is different than reference file "en"`
					)
				}

				checkHasEmptyValue(str)
			})
		})
	})
})

function checkHasEmptyValue(data) {
	data.map((d) => {
		expect(d.name, `Command should have a name`).to.not.equal("")
		expect(d.category, `${d.name} should have a category`).to.not.equal("")
		expect(d.description, `${d.name} should have a description`).to.not.equal("")
		expect(d.keywords, `${d.name} should have a keywords`).to.not.equal("")
		expect(d.usage.length, `"${d.name} should at least 1 usage`).to.not.equal(0)

		d.usage.map((usage, index) => {
			expect(usage.code, `${d.name} usage should have a code`).to.not.equal("")
			expect(usage.description, `${d.name} usage ${index + 1} should have a code description`).to.not.equal("")
		})
	})
}

// https://stackoverflow.com/questions/45709346/comparing-the-keys-of-two-javascript-objects
const checkFileIntegrity = (obj1, obj2) => {
	const o1Keys = []
	const o2Keys = []

	function getAllKeyNames(o, arr, str) {
		Object.keys(o).forEach(function (k) {
			if (Object.prototype.toString.call(o[k]) === "[object Object]") {
				getAllKeyNames(o[k], arr, str + "." + k)
			} else if (Array.isArray(o[k])) {
				o[k].forEach(function (v) {
					getAllKeyNames(v, arr, str + "." + k)
				})
			}

			arr.push(str + "." + k)
		})
	}

	getAllKeyNames(obj1, o1Keys, "")
	getAllKeyNames(obj2, o2Keys, "")

	return o1Keys.length === o2Keys.length
}
