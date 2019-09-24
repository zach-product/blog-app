import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import TextTruncate from 'react-text-truncate'
import { NavBar } from '..';
import './../../App.css'

const Blog = props => (
    <React.Fragment>
        <div className="row py-3">
            <div className="col-12 col-lg-4" style={imgContainer}>
                <img style={aboutImg} className="rounded img-mobile" src={props.post.mainImgPath} alt={props.post.mainImgName} />
            </div>
            <div className="col-12 col-lg-8">
                <Link to={"/blog/"+props.post._id}><h2 className="mb-4 pt-3 pt-lg-0">{props.post.title}</h2></Link>
                {props.post.topics.map((item, index) => {
                    return <p key={index} className='btn btn-secondary btn-sm disabled mr-2'>{item}</p>
                })}
                <TextTruncate 
                    style={fontStyling}
                    line={2}
                    truncateText="..."
                    text={props.post.intro}
                    textTruncateChild={<Link to={"/blog/"+props.post._id}>Read on</Link>}
                />
                <i style={dateStyling}>{moment(props.post.published).format("MMMM D, YYYY")}</i>
            </div>
        </div>
        <hr />
    </React.Fragment>
)

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []  
        }
    }

    componentDidMount() {
        axios.get('/pubs')
            .then(response => {
                this.setState({ posts: response.data })
            })
            .catch((err => {
                console.log(err)
            }))
    }

    blogList() {
        return this.state.posts.map((currentpost, index) => {
            return  <Blog post={currentpost} key={index} />
        })
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1">
                        { this.blogList() }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}

const fontStyling = {
    fontSize: "18px",
    fontWeight: "300",
    marginBottom: ".75rem"
}

const dateStyling = {
    fontSize: "16px",
    fontWeight: "350"
}

const imgContainer = {
    display: "flex",
}

const aboutImg  = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "-50% 50"
}