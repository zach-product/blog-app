import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { NavBarAdmin } from '..'
import './../../App.css'

export default class PreviewPost extends Component {
    constructor(props) {
        super(props)

        this.publishPost = this.publishPost.bind(this)

        this.state = {
            _id: '',
            postId: '',
            mainImgName: '',
            mainImgPath: '',
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
                    _id: response.data._id,
                    postId: response.data.postId,
                    mainImgName: response.data.mainImgName,
                    mainImgPath: response.data.mainImgPath,
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

    publishPost(e) {
        e.preventDefault()

        const post = {
            postId: this.state.postId,
            mainImgName: this.state.mainImgName,
            mainImgPath: this.state.mainImgPath,
            title: this.state.title,
            topics: this.state.topics,
            published: new Date(),
            intro: this.state.intro,
            sections: this.state.sections,
            closing: this.state.closing,
        }

        console.log(post)

        axios.post('/pubs/publish/'+this.props.match.params.id, post)
            .then(res => console.log(res.data))

        window.location = '/admin/posts'
    }

    render() {
        const { _id, mainImgName, mainImgPath, title, topics, published, intro, sections, closing } = this.state
        return (
            <React.Fragment>
                <NavBarAdmin />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1 py-3 py-lg-2">
                        <div style={imgContainer}>
                            <img style={mainImgBlog} className="rounded img-mobile-post" src={mainImgPath} alt={mainImgName} />
                        </div>
                        <h1 className="my-4">{title}</h1>
                        {topics.map((topic, index) => {
                            return <p key={index} className='btn btn-secondary btn-sm disabled mr-2 mb-2'>{topic}</p>
                        })}
                        <p style={fontStyling} className="font-italic float-lg-right my-2">{ published === undefined ? <i>Draft</i> : moment(published).format("MMMM D, YYYY") }</p>
                        <hr className="mb-4" />
                        <p style={fontStyling}>{intro}</p>
                        {sections.map((section, index) => {
                            return  <React.Fragment>
                                        <h3 key={index} className="my-4">{section.header}</h3>
                                        <p key={index} style={fontStyling}>{section.content}</p>
                                    </React.Fragment>
                        })}
                        <br />
                        <p style={fontStyling}>{closing}</p>
                        <hr className="my-4" />
                        <div className="mb-3">
                            <Link to={"/admin/edit/"+_id}><button className="btn btn-primary mr-2">Edit Post</button></Link>
                            <button onClick={this.publishPost} className="btn btn-success">Publish Post</button>
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

const fontStyling = {
    fontSize: "20px",
    fontWeight: "300",
}

const imgContainer = {
    display: "flex",
}

const mainImgBlog  = {
    height: "250px",
    width: "100%",
    objectFit: "cover",
    objectPosition: "-50% 50",
}