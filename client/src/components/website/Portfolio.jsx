import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavBar, Footer } from '..';
import alchemistLogo from '../../assets/alchemist-logo_only.png'
import SignOnSiteLogo from '../../assets/signonsite-logo.png'

export default class Portfolio extends Component {
    constructor(props) {
        super(props)

        this.toggleHoverAlchemist = this.toggleHoverAlchemist.bind(this)
        this.toggleHoverSOS = this.toggleHoverSOS.bind(this)
        
        this.state = {
            hoverAlchemist: false,
            hoverSOS: false
        }
    }

    toggleHoverAlchemist() {
        this.setState({
            hoverAlchemist: !this.state.hoverAlchemist
        })
    }

    toggleHoverSOS() {
        this.setState({
            hoverSOS: !this.state.hoverSOS
        })
    }

    render() {
        const { hoverAlchemist, hoverSOS } = this.state
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="row pt-2 pt-lg-1 align-items-center">
                        <div className="col-12 col-lg-6 mb-3">
                            <Link className="text-decoration-none" to="/portfolio/alchemist">
                                {hoverAlchemist &&
                                    <div className="image-overlay" style={middle}>
                                        <div style={overlayFont}>Alchemist Accelerator is one of the top accelerator programs in Silicon Valley exclusively working with enterprise-focused startups.</div>
                                    </div>
                                }
                                <div style={hoverAlchemist ? cardContainerHover : cardContainer} onMouseEnter={this.toggleHoverAlchemist} onMouseLeave={this.toggleHoverAlchemist} className="card align-items-center py-5">
                                    <img style={portfolioImg} className="card-img-top" src={alchemistLogo} alt="Alchemist Accelerator Logo" />
                                    <div className="card-body text-center">
                                        <h3 className="card-title" style={cardText}>Alchemist Accelerator</h3>
                                        <p className="mt-3" style={cardP}>San Francisco, CA</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <Link className="text-decoration-none" to="/portfolio/signonsite">
                                {hoverSOS &&
                                    <div className="image-overlay" style={middle}>
                                        <div style={overlayFont}>SignOnSite is a workplace health and safety platform for the construction industry.</div>
                                    </div>
                                }
                                <div style={hoverSOS ? cardContainerHover : cardContainer} onMouseEnter={this.toggleHoverSOS} onMouseLeave={this.toggleHoverSOS} className="card align-items-center py-5">
                                    <img style={portfolioImg} className="card-img-top" src={SignOnSiteLogo} alt="SignOnSite Logo" />
                                    <div className="card-body text-center">
                                        <h3 className="card-title" style={cardText}>SignOnSite</h3>
                                        <p className="mt-3" style={cardP}>Canberra, Australia</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(70px + 3%)",
    marginBottom: "calc(50px + 2%"
}

const portfolioImg = {
    maxWidth: "250px",
    display: "center"
}

const cardContainer = {
    backgroundColor: "#f0f0f0",
    border: "none",
    position: "relative"
}

const cardContainerHover = {
    backgroundColor: "#fff",
    border: "none",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    opacity: "0.15"
}

const middle =  {
    transition: ".5s ease",
    position: "absolute",
    width: "65%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center"
}
 
const cardText = {
    color: "#000"
}

const cardP = {
    color: "#000",
    fontSize: "18px",
    fontWeight: "300",
    fontStyle: "italic"
}

const overlayFont = {
    color: "#000",
    fontSize: "24px",
    fontWeight: "450",
    lineHeight: "2",
}