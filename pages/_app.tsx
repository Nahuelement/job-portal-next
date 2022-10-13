import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'
import { JobsProvider } from '../context/JobsContext'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <AuthProvider>
      <JobsProvider>
    <Component {...pageProps} />
      </JobsProvider>
    </AuthProvider>
    </SWRConfig>
    )
}

export default MyApp
