import { ProvideAuth } from '../lib/auth'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
