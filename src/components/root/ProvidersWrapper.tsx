import React, { FC, PropsWithChildren } from 'react'
import theme from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'

import dynamic from 'next/dynamic';

const MantineProvider = dynamic(
  () => import('@mantine/core').then((mod) => mod.MantineProvider),
  { ssr: false }
);

const defaultQueryConfig = { staleTime: 60000, retry: false }

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig }
})

export const ProvidersWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} withCssVariables>
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </>
  )
}
