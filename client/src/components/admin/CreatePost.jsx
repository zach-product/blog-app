import React, { Component } from 'react'
import axios from 'axios'
import SectionInputs from './SectionInputs';

export default class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.titleToPostId = this.titleToPostId.bind(this)
        this.addSect = this.addSect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            postId: '',
            header_pic: '',
            title: '',
            topics: '',
            intro: '',
            sections: [
                {
                    header: '',
                    content: ''
                }
            ],
            closing: '',
        }
    }

    onChangeInput(e) {
        const name = e.target.name
        const value = e.target.value

        if(["header", "content"].includes(e.target.title)) {
            let sections = [...this.state.sections]
            sections[e.target.dataset.id][e.target.title] = e.target.value
            this.setState({ sections }, () => console.log(this.state.sections))
        } else {
            this.setState({
                [name]: value,
            })
        }
    }

    titleToPostId(title) {
        const trimmed = title.trim()
        const replaced = trimmed.split(' ').join('-')
        const lowercase = replaced.toLowerCase()
        return lowercase
    }

    cleanInputArray(e) {
        const name = e.target.name
        const value = e.target.value
        const arr = value.split(",").map(item => item.trim())
        console.log(arr)
        this.setState({ [name]: arr })
    }

    addSect(e) {
        e.preventDefault()
        this.setState(prevState => ({
            sections: [...prevState.sections, { header: '', content: '' }],
        }))
    }

    onSubmit(e) {
        e.preventDefault()
       
        const post = {
            postId: this.titleToPostId(this.state.title),
            header_pic: this.state.header_pic,
            title: this.state.title,
            topics: this.state.topics,
            sections: this.state.sections,
            intro: this.state.intro,
            closing: this.state.closing,
        } 

        console.log(post)

        axios.post('/pubs/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/admin/drafts'
    }

    render() {
        const { header_pic, title, topics, intro, sections, closing } = this.state
        return (
            <div className="container" style={stickyHeader}>
                <div className="col-12 col-lg-10 offset-lg-1">
                    <h2 className='mb-3'>Create New Post</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Header Image URL:</label>
                            <input
                                type="url"
                                className="form-control"
                                name="header_pic"
                                value={header_pic}
                                onChange={this.onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label>Topics:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="topics"
                                value={topics}
                                onChange={this.onChangeInput}
                                onBlur={this.cleanInputArray}
                            />
                        </div>
                        <div className="form-group">
                            <label>Intro:</label>
                            <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                name="intro"
                                value={intro}
                                onChange={this.onChangeInput}
                            />
                        </div>

                        <hr />
                        
                        <h3 className="my-3">Sections</h3>
                        <SectionInputs sections={sections} onChangeInput={this.onChangeInput} />
                        <button onClick={this.addSect} className="btn btn-outline-primary btn-sm mb-2">Add New Section</button>

                        <hr />

                        <div className="form-group">
                            <label>Closing:</label>
                            <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                name="closing"
                                value={closing}
                                onChange={this.onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-primary mr-2"
                                value="Create New Post"
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}