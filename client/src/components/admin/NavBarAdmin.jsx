import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './../../App.css'
import logo from '../../assets/logo.svg'

export default class NavBarAdmin extends Component {
    constructor(props) {
        super(props)
        this.toggleNavBar = this.toggleNavBar.bind(this)
        this.toggleHoverBtn = this.toggleHoverBtn.bind(this)

        this.state = {
            collapsed: true,
        }
    }

    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    toggleHoverBtn(e) {
        this.setState({
            hoverBtn: !this.state.hoverBtn
        })
    }

    render() {
        const { collapsed, hoverBtn } = this.state
        const class1 = collapsed ? 'collapse navbar-collapse justify-content-lg-between' : 'collapse navbar-collapse justify-content-lg-between show'
        const class2 = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler'
        const classTopBar = collapsed ? 'icon-bar top-bar-collapsed' : 'icon-bar top-bar'
        const classMiddleBar = collapsed ? 'icon-bar middle-bar-collapsed' : 'icon-bar middle-bar'
        const classBottomBar = collapsed ? 'icon-bar bottom-bar-collapsed' : 'icon-bar bottom-bar'

        return (
            <header className="fixed-top page-header">
                <nav style={navStyling} className='navbar navbar-expand-lg navbar-dark'>
                    <div className="container">
                        <Link to="/admin" className="navbar-brand brand-font align-middle mr-3">
                            <img src={logo} width="50" length="50" alt="Zach Pritchard" />
                        </Link>
                        <button 
                            onClick={this.toggleNavBar}
                            className={`${class2}`} 
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation">
                            <span className={`${classTopBar}`}></span>
                            <span className={`${classMiddleBar}`}></span>
                            <span className={`${classBottomBar}`}></span>
                        </button>
                        <div className={`${class1}`} id="navbarNav">
                            <ul className="navbar-nav justify-content-inbetween text-center">
                                <li className="nav-item mx-3">
                                    <NavLink style={navLinks} className="nav-link" to="/admin/posts">Posts</NavLink>
                                </li>
                                <li className="nav-item mx-3">
                                    <NavLink style={navLinks} className="nav-link" to="/admin/drafts">Drafts</NavLink>
                                </li>
                            </ul>
                            <div className="align-middle">
                                <form className="text-center mx-lg-0 my-3 my-lg-0">
                                    <Link to="/admin/create"><button onMouseEnter={this.toggleHoverBtn} onMouseLeave={this.toggleHoverBtn} style={ hoverBtn ? createPostBtnHover : createPostBtn} className="btn my-2 my-sm-0" type="submit">Create New Post</button></Link>
                            `   </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

const navStyling = {
    background: '#b73634'
}

const navLinks = {
    fontWeight: "400",
    fontSize: "18px",
    margin: '.8rem',
    letterSpacing: "1px"
}

const createPostBtn = {
    borderColor: "#8fcc9f",
    color: "#8fcc9f",
    fontWeight: "500"
}
    
const createPostBtnHover = {
    background: "#8fcc9f",
    color: "#b73634",
    fontWeight: "500"
}