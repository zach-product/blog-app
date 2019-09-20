import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ContentEditor from './ContentEditor';

export default class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangePublished = this.onChangePublished.bind(this)
        // this.onChangeContent = this.onChangeContent.bind(this)
        this.trimInput = this.trimInput.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.addSect = this.addSect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            header_pic: '',
            title: '',
            topics: '',
            published: new Date(),
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

        if(["header", "content"].includes(e.target.className)) {
            let sections = [...this.state.sections]
            sections[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ sections }, () => console.log(this.state.sections))
        } else {
            this.setState({
                [name]: value,
            })
        }
    }

    onChangePublished(date) {
        this.setState({
            published: date
        })
    }

    cleanInputArray(e) {
        const name = e.target.name
        const value = e.target.value
        const arr = value.split(",").map(item => item.trim())
        console.log(arr)
        this.setState({ [name]: arr })
    }

    trimInput(e) {
        const name = e.target.name
        const value = e.target.value
        const trimmedStr= value.trim()
        console.log(trimmedStr)
        this.setState({ [name]: trimmedStr })
    }

    addSect(e) {
        e.preventDefault()
        this.setState(prevState => ({
            sections: [...prevState.sections, { header: '', content: '' }],
        }))
    }

    // onChangeContent(newContent) {
    //     this.setState({
    //         content: newContent
    //     })
    // }

    onSubmit(e) {
        e.preventDefault()

        const post = {
            header_pic: this.state.header_pic,
            title: this.state.title,
            topics: this.state.topics,
            published: this.state.published,
            intro: this.state.intro,
            closing: this.state.closing,
        }

        console.log(post)

        axios.post('/pubs/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/admin/posts'
    }

    render() {
        const { header_pic, title, topics, published, intro, sections, closing } = this.state
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
                            <label>Published:</label>
                            <div>
                                <DatePicker
                                    selected={published}
                                    onChange={this.onChangePublished} 
                                />
                            </div>
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

                        <div className="d-inline align-middle my-2">
                            <h3 className="mb-2">Sections</h3>
                            <button onClick={this.addSect} className="btn btn-outline-primary btn-sm">Add New Section</button>
                        </div>
                    
                        { sections.map((val, idx) => {
                            let sectId = `sect-${idx}`, contId = `cont-${idx}`
                            return (
                                <div className="py-3" key={idx}>
                                    <div className="form-group">
                                        <label htmlFor={sectId}>{`Section #${idx + 1}`}</label>
                                        <input
                                            type="text"
                                            name={sectId}
                                            data-id={idx}
                                            id={sectId}
                                            className="header"
                                            value={sections[idx].header}
                                            onChange={this.onChangeInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={contId}>Content</label>
                                        <textarea
                                            type="text"
                                            rows="5"
                                            name={contId}
                                            data-id={idx}
                                            id={contId}
                                            className="content"
                                            value={sections[idx].content}
                                            onChange={this.onChangeInput}
                                        />
                                    </div>
                                </div>
                            )
                        })}

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
                        {/* <div className="form-group">
                            <label>Content: </label>
                            <ContentEditor
                                onChangeContent={this.onChangeContent}
                            />
                        </div> */}
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-primary"
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
    marginTop: "calc(30px + 3%)"
}