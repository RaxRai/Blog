'use client';

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRef } from 'react'

import axios from 'axios'
import Login from '@/components/login';
import LoginProvider from '@/components/contexts/loginProvider';
import Layout from '@/components/layout/'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginProvider >
        <Layout />
      </LoginProvider>
    </>
  )
}
