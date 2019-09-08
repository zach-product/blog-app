import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'

export default class NavBarAdmin extends Component {
    constructor(props) {
        super(props)
        this.toggleNavBar = this.toggleNavBar.bind(this)

        this.state = {
            collapsed: true,
        }
    }

    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        const collapsed  = this.state.collapsed
        const classOne = collapsed ? 'collapse navbar-collapse justify-content-lg-between' : 'collapse navbar-collapse justify-content-lg-between show'
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right'


        return (
            <header className="fixed-top page-header">
                <nav style={navStyling} className='navbar navbar-expand-lg navbar-dark'>
                    <div className="container">
                        <Link to="/admin/posts" className="navbar-brand brand-font align-middle">
                            <img src={logo} width="50" length="50" alt="Zachary Pritchard" />
                            <span className="ml-3">Zach Pritchard - Admin</span>
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
                            <ul className="navbar-nav">
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/admin/posts">Posts</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link" to="/admin/projects">Projects</Link>
                                </li>
                            </ul>
                            <div className="align-middle float-right my-2">
                                <Link className="btn btn-outline-light font-weight-bold" to="/admin/users/create" role="button">Create User</Link>
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