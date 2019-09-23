import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { NavBarAdmin } from '..'
import './../../App.css'

export default class PreviewPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            header_pic: '',
            title: '',
            topics: [],
            published: '',
            intro: '', 
            sections: [
                {
                    header: '',
                    content: '',
                }
            ],
            closing: '', 
        }
    }

    componentDidMount() {
        axios.get('/pubs/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    header_pic: response.data.header_pic,
                    title: response.data.title,
                    topics: response.data.topics,
                    published: response.data.published,
                    intro: response.data.intro,
                    sections: response.data.sections,
                    closing: response.data.closing,            
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { header_pic, title, topics, published, intro, sections, closing } = this.state
        return (
            <React.Fragment>
                <NavBarAdmin />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1 py-3 py-lg-2">
                        <div style={imgContainer}>
                            <img style={aboutImg} className="rounded" src={header_pic} alt={header_pic} />
                        </div>
                        <h1 className="my-4">{title}</h1>
                        {topics.map(topic => {
                            return <p className='btn btn-secondary btn-sm disabled mr-2 mb-2'>{topic}</p>
                        })}
                        <p style={fontStyling} className="font-italic float-lg-right my-2">{ published === undefined ? <i>Draft</i> : moment(published).format("MMMM D, YYYY") }</p>
                        <hr className="mb-4" />
                        <p style={fontStyling}>{intro}</p>
                        {sections.map(section => {
                            return  <React.Fragment>
                                        <h3 className="my-4">{section.header}</h3>
                                        <p style={fontStyling}>{section.content}</p>
                                    </React.Fragment>
                        })}
                        <br />
                        <p style={fontStyling}>{closing}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(30px + 3%)"
}

const fontStyling = {
    fontSize: "20px",
    fontWeight: "300",
}

const imgContainer = {
    display: "flex",
}

const aboutImg  = {
    height: "100%",
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    objectPosition: "-50% 50",
}