import "bootstrap/dist/css/bootstrap.css"
import "../styles/globals.css"
import "../styles/home.css"
import "../styles/search.css"
import "../styles/card.css"
import "../styles/code.css"
import "../styles/footer.css"

function MyApp({ Component, pageProps }) {
    console.log(
        "Hey there!\nInstead of peeking into the code,\nyou can find the whole project on\nhttps://github.com/excalith/git-cheats"
    )
    return <Component {...pageProps} />
}

export default MyApp
