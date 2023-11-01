import Layout from '@/components/Layout/Layout.jsx';

import '@/styles/index.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
        </Layout>
    );
}
