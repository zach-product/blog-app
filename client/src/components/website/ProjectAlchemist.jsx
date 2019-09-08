import React, { Component } from 'react'
import { NavBar } from '..';

import alchemistLogo from '../../assets/alchemist-logo_only.png'

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
                                    <img style={portfolioImg} src={alchemistLogo} alt="Alchemist Accelerator Logo" />
                                </div>
                                <div className="col-lg-7">
                                    <a href="https://alchemistaccelerator.com" target="_blank" rel="noopener noreferrer">
                                        <h1 className="mb-3">Alchemist Accelerator</h1>
                                    </a>
                                    <p className="mb-3" style={projectDesc}>Alchemist Accelerator is one of the top accelerator programs in Silicon Valley exclusively working with enterprise-focused startups.</p>
                                    <p className="mb-3" style={projectType}>San Francisco / Remote - Full Time - 3 years</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <h3>Brief</h3>
                            <hr />
                            <p style={mainText}>Alchemist Accelerator was well-positioned but facing lots of competition. They wanted to grow their accelerator program by expanding the size of each class while staying lean and maintaining a high quality program. Prior to joining, Alchemist's product team consisted of 2 engineers without a dedicated product manager.</p>
                        </div>                        
                        <div className="col-12 mb-4">
                            <h3>Work</h3>
                            <hr />
                            <p style={mainText}>I implemented over many iterations a complete agile product process from performing research to measuring results. In the end, we were releasing on a feature or bug ready basis translating to once or twice a week. Ultimately, we delivered, maintained, and iterated two products:</p>
                            <ul>
                                <li style={mainText}>Vault for Founders, providing program founders access to the Alchemist network and resources, and</li>
                                <li style={mainText}>Vault for Ops, providing tools for the Alchemist ops team to manage the Alchemist founders and larger network of investors, corporate customers and mentors.</li>
                            </ul>
                            <p style={mainText}>I grew Alchemist's product team to 4 engineers, 2 designers, 1 product manager (me), and 1 associate product manager.</p>
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