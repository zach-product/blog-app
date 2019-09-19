import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { NavBarAdmin } from '..'
import './../../App.css'

export default class OnePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            header_pic: '',
            title: '',
            topics: [],
            published: new Date(),
            intro: '', 
        }
    }

    componentDidMount() {
        axios.get('/pubs/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    header_pic: response.data.header_pic,
                    title: response.data.title,
                    topics: response.data.topics,
                    intro: response.data.intro,
                    published: new Date(response.data.published)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { header_pic, title, topics, published, intro } = this.state
        return (
            <React.Fragment>
                <NavBarAdmin />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1 py-3 py-lg-2">
                        <div style={imgContainer}>
                            <img style={aboutImg} className="rounded" src={header_pic} alt={header_pic} />
                        </div>
                        <h1 className="my-4">{title}</h1>
                        {topics.map(item => {
                            return <p className='btn btn-secondary btn-sm disabled mr-2 mb-2'>{item}</p>
                        })}
                        <p style={fontStyling} className="font-italic float-lg-right my-2">{moment(published).format("MMMM D, YYYY")}</p>
                        <hr className="mb-4" />
                        <p style={fontStyling}>{intro}</p>
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