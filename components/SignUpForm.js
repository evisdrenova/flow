import React from 'react'
const { render } = require("react-dom");
import Link from 'next/link'
import Router from 'next/router'
import cookie from 'js-cookie'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            company: '',
            password: '',
            confirm_password: '',
            errors: {},
            style: {},
            submitButton: '',
            setSignupError: ''
        };

        this.initialState = this.state

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.validateform()
        })
    }

    validateform = () => {

        const { first_name, last_name, company, email, password, confirm_password } = this.state

        let errors = {}

        if (confirm_password != password) {
            errors['password'] = "Passwords don't match"
            this.setState({
                errors: errors,
                style: {
                    border: '5px solid rgba(182, 15, 15,0.56)',
                },
                submitButton: '{true}'
            })
        } else {
            this.setState(this.initialState)
        }

    }

    handleSubmit = e => {
        const { first_name, last_name, company, email, password } = this.state
        e.preventDefault();
        const passwordError = this.state.errors['password']
        const errors = this.state.errors

        // if(!this.state.first_name){
        //     errors["first_name"] = "First name can't be blank"
        // }
        // if(!this.state.last_name){
        //     errors["last_name"] = "Last name can't be blank"
        // }

        // if(!this.state.email){
        //     errors["email"] = "Email can't be blank"
        // }

        // if(!this.state.company){
        //     errors["company"] = "Company can't be blank"
        // }

       // this.setState({errors: errors})

        if (errors) {
            console.log(errors)
            this.setState({ errors: errors })
        }
        else {
            fetch('/api/signUpUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    company,
                    password
                })
            })
            .then((r) => r.json())
            .then((data) =>{
                if(data && data.error){
                    this.setState({
                        setSignupError: data.message
                    })
                }
                if(data && data.token){
                    cookie.set('token', data.token, {expires: 2}) 
                    Router.push('/');
                }
            })
        }
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="first_name" placeholder="first_name" onChange={this.handleChange}></input>
                        <div>{this.state.errors.first_name}</div>
                    </div>
                    <div>
                        <input type="text" name="last_name" placeholder="last_name" onChange={this.handleChange}></input>
                        <div>{this.state.errors.last_name}</div>
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="email" onChange={this.handleChange}></input>
                        <div>{this.state.errors.email}</div>
                    </div>
                    <div>
                        <input type="text" name="company" placeholder="company" onChange={this.handleChange}></input>
                        <div>{this.state.errors.company}</div>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input style={this.state.style} type="password" name="confirm_password" placeholder="confirm password" onChange={this.handleChange}></input>
                        <div>{this.state.errors.password}</div>
                    </div>
                    <button disabled={this.state.submitButton} type="submit">Sign-up</button>
                </form>
            </>
        )
    }
}

export default SignUpForm;