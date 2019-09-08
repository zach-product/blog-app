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
            title: '',
            author: '',
            topics: '',
            content: {},
            published: new Date(),
            users: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.firstname + ' ' + user.lastname),
                        author: response.data[0].firstname + ' ' + response.data[0].lastname
                    })
                }
            })
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
            title: this.state.title,
            author: this.state.author,
            topics: this.state.topics,
            content: this.state.content,
            published: this.state.published,
        }

        console.log(post)

        axios.post('http://localhost:3000/pubs/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        // window.location = '/admin/posts'
    }

    render() {
        const { title, author, topics, published } = this.state
        return (
            <div className="container" style={navSpace}>
                <div className="col-12 col-lg-10 offset-lg-1">
                    <h3 className='mb-3'>Create New Post</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.onChangeInput}
                                onBlur={this.trimInput}
                            />
                        </div>
                        <div className="form-group">
                            <label>Author:</label>
                            <select
                                ref="userInput"
                                required
                                className="form-control"
                                name="author"
                                value={author}
                                onChange={this.onChangeInput}>
                                    {
                                        this.state.users.map(user => {
                                            return <option
                                                key={user}
                                                value={user}>{user}
                                            </option>
                                        })
                                    }
                            </select>
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