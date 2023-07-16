// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import '../styles/global.css';

// This default export is required in a new `pages/_app.tsx` file.
const VamtDatalab = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default VamtDatalab;
