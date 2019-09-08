import React, { Component } from 'react'
import { NavBar } from '..';

import SignOnSiteLogo from '../../assets/signonsite-logo.png'

export default class ProjectAlchemist extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="col-lg-10 offset-lg-1">
                        <div className="col-12 mb-4">
                            <div className="row" style={projectHeader}>
                                <div className="text-center col-lg-2 mb-3">
                                    <img style={portfolioImg} src={SignOnSiteLogo} alt="SignOnSite Logo" />
                                </div>
                                <div className="col-lg-7">
                                    <a href="https://signonsite.com.au/" target="_blank" rel="noopener noreferrer">
                                        <h1 className="mb-3">SignOnSite</h1>
                                    </a>
                                    <p className="mb-3" style={projectDesc}>SignOnSite is a workplace health and safety platform for the construction industry.</p>
                                    <p className="mb-3" style={projectType}>Canberra, Australia - Contract - 3 months</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <h3>Brief</h3>
                            <hr />
                            <p style={mainText}>SignOnSite was getting traction and starting to grow quickly. The product organization was feeling the pressure of feature requests from both clients and the sales organization. Additionally, communication between product and other internal teams such as support, marketing, and sales was breaking down during the development process.</p>
                        </div>                        
                        <div className="col-12 mb-4">
                            <h3>Work</h3>
                            <hr />
                            <p style={mainText}>I collaborated with their CEO and CTO to define their product vision and strategy. I performed a deep dive of the current state of the product development process including all other departments involved in the process. I worked with their team to design a product process  for SignOnSite that provided structure and transparency throughout the entire process from research to measuring their results.</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}

const projectHeader = {
    alignItems: "center"
}

const projectDesc = {
    fontStyle: "italic",
    fontSize: "16px",
    fontWeight: "300"
}

const projectType = {
    fontSize: "14px",
    fontWeight: "450"
}

const portfolioImg = {
    maxHeight: "200px",
    maxWidth: "100%",
    objectFit: "cover",
    objectPosition: "-20% 0"
}

const mainText = {
    fontSize: "20px",
    fontWeight: "300"
}