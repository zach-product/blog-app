import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.toggleHoverBtn = this.toggleHoverBtn.bind(this)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            hoverBtn: false,
        }
    }

    toggleHoverBtn(e) {
        this.setState({
            hoverBtn: !this.state.hoverBtn
        })
    }

    onChangeInput(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user)

        axios.post('/users/register', user)
            .catch(error => {
                console.log(error)  
            })
        
        window.location = "/admin"
    }
    
    render() {
        const { firstname, lastname, email, password, hoverBtn } = this.state
        return (
            <div className="container">
                <div className="col-12 col-lg-6 offset-lg-3">
                    <h3 className="my-3" style={{ color: "#1e2958" }}>Admin Registration</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="firstname">First Name:</label>
                            <input type="text" required name="firstname" value={firstname} onChange={this.onChangeInput} className="form-control" id="firstname" aria-label="firstname" placeholder="Lucia" />                    
                        </div>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="email">Last Name:</label>
                            <input type="text" required name="lastname" value={lastname} onChange={this.onChangeInput} className="form-control" id="lastname" aria-label="lastname" placeholder="Johansen" />                    
                        </div>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="email">Email:</label>
                            <input type="email" required name="email" value={email} onChange={this.onChangeInput} className="form-control" id="email" aria-label="email" placeholder="have@greatday.com" />                    
                        </div>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="password">Password:</label>
                            <input type="password" required name="password" value={password} onChange={this.onChangeInput} className="form-control" id="password" aria-label="password" placeholder="keep it a secret" />                    
                        </div>
                        <div className="align-items-center">
                            <button onMouseEnter={this.toggleHoverBtn} onMouseLeave={this.toggleHoverBtn} style={ hoverBtn ? contactBtnHover : contactBtn } className="btn my-2 my-sm-0" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const labelReqStyling = {
    color: "#1e2958",
    fontWeight: "500",
    fontSize: "18px",
    letterSpacing: ".5px"
}

const contactBtn = {
    background: "#1e2958",
    color: "white",
    fontWeight: "500"
}

const contactBtnHover = {
    borderColor: "#1e2958",
    color: "#1e2958",
    fontWeight: "500",
}
