import React, { useState } from 'react'
const { render } = require("react-dom");
import Link from 'next/link'
import Router from 'next/router'
import cookie from 'js-cookie'


class Loginform extends React.Component {
    
    state = {
        email: '',
        password: '',
        loginError: '',
        setLoginError: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        const {email, password} = this.state
        e.preventDefault();
       const res = fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then((r) => {
            return r.json();
          })
          .then((data) => {
            if (data && data.error) {
                this.setState({
                    setLoginError:(data.message)
                })
            }
            if(data && data.token){
                cookie.set('token', data.token, {expires:2}) //expires is in days
                Router.push('/home') 
            }
        })
    }
    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="email" onChange={this.handleChange}></input>
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                </div>
                <button type="submit">Submit</button>
                <div>{<p style={{color: 'red'}}>{this.state.setLoginError}</p>}</div>
     
            </form>
            <p>Don't have an account already? <Link href='/signUp'>Sign up</Link></p>
            </>
        )
    }
}
 
export default Loginform;