/**
 *
 * TODO: Inject the styles defined into this root app
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/main.css';
import '../src/styles/auth.css';
import '../src/styles/app.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
