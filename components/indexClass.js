import React from 'react'
const { render } = require("react-dom");
import Head from 'next/head'
import cookie from 'js-cookie'
import useSWR from 'swr'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Loginform from './LoginForm';
import GitImport from './gitImport';
import Link from 'next/link'

function Home() {
    const {data, revalidate} = useSWR('/api/getUser', async function(args) {
      const res = await fetch(args);
      return res.json();
    });
    
    if (!data) return null 
    let loggedIn = false;
    if (data.email) {
      loggedIn = true;
    }
    if(!loggedIn){
        Router.push('/login')
    }else{
        Router.push('/home')
    }
    return (null)
  }
  
  export default Home;


  //<p>Welcome {data.email}!</p>
    //         <button
    //           onClick={() => {
    //             cookie.remove('token');
    //             revalidate();
    //           }}>
    //           Logout
    //         </button>