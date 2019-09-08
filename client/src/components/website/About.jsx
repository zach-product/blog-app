import React, { Component } from 'react'
import { NavBar, Footer } from '..';
import about from '../../assets/about.JPG'

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            about: [
                "I'm Zach Pritchard, a product manager with UX design and front end development skills. I enjoy solving problems with technology and figuring out how and why products work.",
                "Previously, I worked for Alchemist Accelerator, a top-ranked accelerator based in San Francisco. Prior to Alchemist, I was a founder of an on-demand storage business based in New York.",
                "Currently, I'm looking for my next challenge targeting (but not limited to) the education, healthcare, and construction industries. I also generally enjoy products that remove complexity from people's lives.",
                "If you're interested in working together or just chatting about products, please send me a message using the Contact Me button."
            ]
        }
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="row">
                        <div className="col-12 col-lg-6 pt-2 pt-lg-1 px-3" style={imgContainer}>
                            <img style={aboutImg} className="rounded" src={about} width="100%" alt="Zachary Pritchard" />   
                        </div>
                        <div className="col-12 col-lg-6 p-3">
                            {this.state.about.map((line, index) => {
                                return <p style={aboutP} key={index}>{line}</p>
                            })}
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
    marginBottom: "50px"
}

const aboutP = {
    marginBottom: "2rem",
    fontSize: "20px",
    fontWeight: "300"
}

const imgContainer = {
    display: "flex",
    maxHeight: "550px",
    marginBottom: "1rem"
}

const aboutImg  = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "-20% 0"
}

