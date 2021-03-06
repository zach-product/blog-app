import React, { Component } from 'react'
import axios from 'axios'

export default class ContactForm extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.toggleHoverBtn = this.toggleHoverBtn.bind(this)
        this.toggleHoverCancel = this.toggleHoverCancel.bind(this)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            message: '',
            hoverBtn: false,
            hoverCancel: false
        }
    }

    toggleHoverBtn(e) {
        this.setState({
            hoverBtn: !this.state.hoverBtn
        })
    }

    toggleHoverCancel(e) {
        this.setState({
            hoverCancel: !this.state.hoverCancel
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
            message: this.state.message
        }

        console.log(user)

        axios.post('/users/contact', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        
        axios.post('/api/mail/new_message', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        
        axios.post('/api/mail/message_received', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            
        this.handleClearForm()

        this.props.toggleContactForm()

        this.props.toggleEmailSent()
    }

    handleClearForm(e) {
        this.setState({ 
            firstname: '', 
            lastname: '', 
            email: '', 
            message: '' 
        })
    }

    render() {
        const { firstname, lastname, email, message, hoverBtn, hoverCancel } = this.state
        
        return (
            <form onSubmit={this.onSubmit} className="col-12 col-lg-4 offset-lg-8 p-3 mb-5 mt-2 mt-lg-1 rounded" style={formContainer}>
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
                    <label style={labelStyling} htmlFor="message">Message:</label>
                    <textarea rows="3" type="text" name="message" value={message} onChange={this.onChangeInput} className="form-control" id="message" aria-label="message" placeholder="Include a message if you'd like (optional)" />                    
                </div>
                <div className="align-items-center">
                    <button onMouseEnter={this.toggleHoverBtn} onMouseLeave={this.toggleHoverBtn} style={ hoverBtn ? contactBtnHover : contactBtn } className="btn my-2 my-sm-0" type="submit">Send Message</button>
                    <a href="# " className="ml-3" onMouseEnter={this.toggleHoverCancel} onMouseLeave={this.toggleHoverCancel} onClick={this.props.onClickCancel} style={ hoverCancel ? cancelLinkHover : cancelLink }>Cancel</a>
                </div>
            </form>
        )
    }
}

const formContainer = {
    background: "#1e2958",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
}

const labelStyling = {
    color: "white",
    fontWeight: "300",
    fontSize: "18px",

}

const labelReqStyling = {
    color: "white",
    fontWeight: "500",
    fontSize: "18px",
    letterSpacing: ".5px"
}

const contactBtn = {
    borderColor: "#8fcc9f",
    color: "#8fcc9f",
    fontWeight: "500"
}

const contactBtnHover = {
    background: "#8fcc9f",
    color: "#1e2958",
    fontWeight: "500",
}

const cancelLink = {
    color: "white",

}

const cancelLinkHover = {
    color: "white",
    textDecoration: "underline",
    cursor: "pointer"
}
