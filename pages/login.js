import LoginForm from '../components/LoginForm'
import Head from 'next/head'
import checkCookies from '../components/checkCookies'
import Router from 'next/router'

export default function Login() {

    <Head>
        <title>Candl</title>
    </Head>

    const a = checkCookies()

    if (a == 'null') {
        return null
    } else if (a == 'not logged in') {
        return (
            <LoginForm />
        )
    } else {
        Router.push('/home')
    }

    return (
        null
    )
}