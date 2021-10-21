/**
 *
 * TODO: Inject the styles defined into this root app
 */

import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';

import withReduxStore from '../src/store/lib/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/main.css';
import '../src/styles/auth.css';
import '../src/styles/app.css';

function MyApp({ Component, pageProps, store }) {
    return (
        <>
            <Head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default withReduxStore(MyApp);
