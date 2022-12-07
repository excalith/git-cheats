const { patchWebpackConfig } = require("next-global-css")

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	productionBrowserSourceMaps: true
}

module.exports = nextConfig