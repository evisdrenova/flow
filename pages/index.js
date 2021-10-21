import Index from '../components/indexClass'
import Head from 'next/head'
import Home from './home'
import checkCookies from '../components/checkCookies'
import Loginform from '../components/LoginForm'
import Router from 'next/router'


export default function indexClass() {
  
  <Head>
    <title>Candl</title>
  </Head>

  const a = checkCookies()

  if (a == 'null') {
    return null
  } else if (a == 'not logged in') {
    return (
      <Loginform />
    )
  } else {
    Router.push('/home')
  }

  return (
    null
  )
}

