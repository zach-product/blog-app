import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.handleClearForm = this.handleClearForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.toggleHoverBtn = this.toggleHoverBtn.bind(this)

        this.state = {
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

    handleClearForm() {
        this.setState({
            email: '',
            password: ''
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user)

        axios.post('/users/login', user)
            .then(this.props.toggleIsLoggedIn)
            .catch(error => {
                console.log(error)
            })
        
        this.handleClearForm()
    }
    
    render() {
        const { email, password, hoverBtn } = this.state
        return (
            <div className="container">
                <div className="col-12 col-lg-6 offset-lg-3">
                    <h3 className="my-3" style={{ color: "#1e2958" }}>Admin Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="email">Email:</label>
                            <input type="email" required name="email" value={email} onChange={this.onChangeInput} className="form-control" id="email" aria-label="email" placeholder="have@greatday.com" />                    
                        </div>
                        <div className="form-group">
                            <label style={labelReqStyling} htmlFor="password">Password:</label>
                            <input type="password" required name="password" value={password} onChange={this.onChangeInput} className="form-control" id="password" aria-label="password" placeholder="keep it a secret" />                    
                        </div>
                        <div className="align-items-center">
                            <button onMouseEnter={this.toggleHoverBtn} onMouseLeave={this.toggleHoverBtn} style={ hoverBtn ? contactBtnHover : contactBtn } className="btn my-2 my-sm-0" type="submit">Login</button>
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
