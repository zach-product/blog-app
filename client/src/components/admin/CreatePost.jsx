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
        this.onChangeContent = this.onChangeContent.bind(this)
        this.trimInput = this.trimInput.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            header_img: '',
            title: '',
            topics: '',
            published: new Date(),
            content: '',
        }
    }

    onChangeInput(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        })
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

    onChangeContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const post = {
            header_img: this.state.header_img,
            title: this.state.title,
            topics: this.state.topics,
            content: this.state.content,
            published: this.state.published,
        }

        console.log(post)

        axios.post('/pubs/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        // window.location = '/admin/posts'
    }

    render() {
        const { title, topics, published } = this.state
        return (
            <div className="container" style={navSpace}>
                <div className="col-12 col-lg-10 offset-lg-1">
                    <h3 className='mb-3'>Create New Post</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Header Image Link:</label>
                            <input
                                type="url"
                                className="form-control"
                                name="header_img"
                                value={header_img}
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
                        {/* <div className="form-group">
                            <label>Content:</label>
                            <textarea
                                type="text"
                                rows="10"
                                className="form-control"
                                name="content"
                                value={content}
                                onChange={this.onChangeInput}
                            />
                        </div> */}
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
                            <label>Content: </label>
                            <ContentEditor
                                onChangeContent={this.onChangeContent}
                            />
                        </div>
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

const navSpace = {
    marginTop: "calc(70px + 3%)" 
}