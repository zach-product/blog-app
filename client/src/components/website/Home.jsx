import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

import '../../App.css'

export default class Home extends Component {
    constructor(props) {
        super(props)
        
        this.toggleHoverAbout = this.toggleHoverAbout.bind(this)
        this.toggleHoverPortfolio = this.toggleHoverPortfolio.bind(this)
        this.toggleHoverBlog = this.toggleHoverBlog.bind(this)

        this.state = {
            hoverAbout: false,
            hoverPortfolio: false,
            hoverBlog: false,
        }

    }

    toggleHoverAbout() {
        this.setState({
            hoverAbout: !this.state.hoverAbout
        })
    }

    toggleHoverPortfolio() {
        this.setState({
            hoverPortfolio: !this.state.hoverPortfolio
        })
    }

    toggleHoverBlog() {
        this.setState({
            hoverBlog: !this.state.hoverBlog
        })
    }

    

    render() {
        const { hoverAbout, hoverPortfolio, hoverBlog } = this.state
        return (
            <div style={bgMain}>
                <div style={bgHome}>
                    <div style={homeContainer}>
                        <div  className="col-12 pb-2 mt-5 mt-lg-0" style={mainContent}>
                            <div className="pb-4 pb-lg-5 pt-lg-0" style={logoContainer}>
                                <img style={logoHome} src={logo} alt="logo"/>                            
                            </div>
                            <h1 className="mb-4 mb-lg-4 text-white">Hi. I'm Zach. Nice to meet you!</h1>
                            <div className="mb-4 mb-lg-4 ml-4 ml-lg-0 text-white" style={roleStyles}>
                                <span className="col-12 col-lg-3 d-flex d-lg-inline my-3 my-lg-0">Product Manager</span> 
                                    <span className="d-none d-lg-inline">&nbsp; • &nbsp;</span>
                                <span className="col-12 col-lg-3 d-flex d-lg-inline my-3 my-lg-0">UX/UI Designer</span> 
                                    <span className="col-12 d-none d-lg-inline">&nbsp; • &nbsp;</span>
                                <span className="col-12 col-lg-3 d-flex d-lg-inline my-3 my-lg-0">Front End Developer</span>
                            </div>
                            <div className="w-100" style={mainContent}>
                                <Link to="/about"><button onMouseEnter={this.toggleHoverAbout} onMouseLeave={this.toggleHoverAbout} style={ hoverAbout ? btnHomeHover : btnHome } className='col-12 col-lg-2 btn btn-lg m-lg-3 mb-3'>About</button></Link>
                                <Link to="/portfolio"><button onMouseEnter={this.toggleHoverPortfolio} onMouseLeave={this.toggleHoverPortfolio} style={ hoverPortfolio ? btnHomeHover : btnHome } className='col-12 col-lg-2 btn btn-lg m-lg-3 mb-3'>Portfolio</button></Link>
                                <Link to="/blog"><button onMouseEnter={this.toggleHoverBlog} onMouseLeave={this.toggleHoverBlog} style={ hoverBlog ? btnHomeHover : btnHome } className='col-12 col-lg-2 btn btn-lg m-lg-3 mb-3'>Blog</button></Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}


const bgMain = {
    background: "#1e2958",
    height: "100%",
    width: "100%",
}


const bgHome = {
    background: "#1e2958",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}

const homeContainer = {
    background: "#1e2958",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
}

const mainContent = {
    background: "#1e2958",
    textAlign: "center",
}

const logoContainer = {
    paddingTop: "7rem"
}

const logoHome = {
    maxWidth: "250px",
    height: "auto"
}

const roleStyles = {
    fontSize: "28px",
    fontWeight: "200",
    letterSpacing: "1px",
    textAlign: "center"
}

const btnHome = {
    borderColor: "#8fcc9f",
    color: "#8fcc9f"
}

const btnHomeHover = {
    background: "#8fcc9f",
    color: "#1e2958",
    fontWeight: "600"
}