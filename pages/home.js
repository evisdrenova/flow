import Head from 'next/head'
import Loginform from '../components/LoginForm'
import Router from 'next/router'
import checkCookies from '../components/checkCookies'
import Toolbar   from '../components/toolbar'
import Canvas from '../components/canvas'


export default function Home() {
    <Head>
        <title>Candl</title>
    </Head>

    const a = checkCookies()

    if (a == 'null') {
        return null
    } else if (a == 'not logged in') {
            Router.push('/login')
    } else {
        return(
            <>
            <Toolbar />
            {/* <Canvas /> */}
            </>
        )
    }

    return (
        null
    )
}