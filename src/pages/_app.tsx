import type { AppProps } from 'next/app'
import { ProvidersWrapper } from '@/components/root/ProvidersWrapper'
import '@/global.css'
import { Page } from '@/types'
import { RootLayout } from '@/components/layouts'

type Props = AppProps & {
  Component: Page
}

export default function App({ Component, pageProps }: Props) {
  const Layout = Component.Layout ?? RootLayout

  return (
    <>
      <ProvidersWrapper>
          <Component {...pageProps} />
      </ProvidersWrapper>
    </>
  )
}
