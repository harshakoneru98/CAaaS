/**
 * 
 * TODO: Inject the styles defined into this root app
 */
 import 'bootstrap/dist/css/bootstrap.min.css'
 import '../src/styles/main.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp