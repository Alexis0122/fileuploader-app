import React from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Uploader } from '@/feature'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>QuickDropID</title>
        <meta name='description' content='example' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${inter.className}`}>
        <Uploader/>
      </main>
    </>
  )
}