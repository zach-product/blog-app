import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './../../App.css'
import ContactForm from './ContactForm' 

import logo from '../../assets/logo.svg'

export default class NavBarAbout extends Component {
    constructor(props) {
        super(props)

        this.toggleNavBar = this.toggleNavBar.bind(this)
        this.toggleHoverBtn = this.toggleHoverBtn.bind(this)
        this.onClickContactBtn = this.onClickContactBtn.bind(this)
        this.onClickCancel = this.onClickCancel.bind(this)
        // this.onChangeInput = this.onChangeInput.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            collapsed: true,
            hoverBtn: false,
            contactForm: false,
        }
    }

    onClickContactBtn(e) {
        e.preventDefault()
        this.setState({ contactForm: !this.state.contactForm, collapsed: !this.state.collapsed })
    }

    onClickCancel(e) {
        e.preventDefault()
        this.setState({ contactForm: !this.state.contactForm})
    }

    toggleNavBar(e) {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    toggleHoverBtn(e) {
        this.setState({
            hoverBtn: !this.state.hoverBtn
        })
    }

    // onSubmit(e) {
    //     e.preventDefault()


    //     const user = {
    //         email: this.state.email
    //     }

    //     console.log(user)

    //     axios.post('http://localhost:3000/users/add', user)
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
            
    //         this.setState({ emailSent: !this.state.emailSent })

    //         this.handleClearForm()
    // }

    // handleClearForm(e) {
    //     this.setState({ email: '', message:'' })
    // }

    render() {
        const { collapsed, hoverBtn, contactForm } = this.state
        const classOne = collapsed ? 'collapse navbar-collapse justify-content-lg-between' : 'collapse navbar-collapse justify-content-lg-between show'
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right'
        

        return (
            <header className="fixed-top page-header">
                <nav style={navStyling} className='navbar navbar-expand-lg navbar-dark'>
                    <div className="container">
                        <Link to="/" className="navbar-brand brand-font align-middle mr-3">
                            <img src={logo} width="50" length="50" alt="Zach Pritchard" />
                            {/* <span className="mx-3"></span> */}
                        </Link>
                        <button 
                            onClick={this.toggleNavBar} 
                            className={`${classTwo}`} 
                            type="button"
                            target="_blank"
                            data-toggle="collapse" 
                            data-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className={`${classOne}`} id="navbarNav">
                            <ul className="navbar-nav justify-content-inbetween">
                                <li className="nav-item mx-3">
                                    <NavLink style={navLinks} className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item mx-3">
                                    <NavLink style={navLinks} className="nav-link" to="/portfolio">Portfolio</NavLink>
                                </li>
                                <li className="nav-item mx-3">
                                    <NavLink style={navLinks} className="nav-link" to="/blog">Blog</NavLink>
                                </li>
                            </ul>
                            <div className="align-middle">
                                <form className="form-inline mx-4 mx-lg-0 my-3 my-lg-0">
                                    <button onClick={this.onClickContactBtn} onMouseEnter={this.toggleHoverBtn} onMouseLeave={this.toggleHoverBtn} style={ hoverBtn || contactForm ? contactBtnHover : contactBtn} className="btn my-2 my-sm-0" type="submit">Contact Me</button>
                            `   </form>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container" style={ contactForm ? null : contactFormClosed }>
                    <ContactForm onClickCancel={this.onClickCancel} />
                </div>
            </header>
        )
    }
}

const navStyling = {
    background: '#1e2958'
}

const navLinks = {
    fontWeight: "400",
    fontSize: "18px",
    margin: '.8rem',
    letterSpacing: "1px"
}

const contactBtn = {
    borderColor: "#8fcc9f",
    color: "#8fcc9f",
    fontWeight: "500"
}
    
const contactBtnHover = {
    background: "#8fcc9f",
    color: "#1e2958",
    fontWeight: "500"
}

const contactFormClosed = {
    display: "none"
}