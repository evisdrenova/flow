import React from 'react'
import Head from 'next/head'
import cookie from 'js-cookie'
import useSWR from 'swr'



function checkCookies() {
    const {data, revalidate} = useSWR('/api/getUser', async function(args) {
      const res = await fetch(args);
      return res.json();
    });
    
    if (!data) return 'null' //this really should return a 404 error
    let loggedIn = false;
    if (data.email) {
      loggedIn = true;
    }
    if(!loggedIn){
        return 'not logged in'
    }else{
        return 'logged in'
    }
    return (null)
  }
  
  export default checkCookies;