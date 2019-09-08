import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class EditPost extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangePublished = this.onChangePublished.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title: '',
            author: '',
            topics: '',
            content: '',
            published: new Date(),
            users: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/pubs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    author: response.data.author,
                    topics: response.data.topics,
                    content: response.data.content,
                    published: new Date(response.data.published)
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.firstname + ' ' + user.lastname),
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

        axios.post('http://localhost:3000/pubs/update/'+this.props.match.params.id, post)
            .then(res => console.log(res.data))

        window.location = '/admin/posts'
    }

    render() {
        const { title, author, topics, content, published } = this.state
        return (
            <div className="container" style={navSpace}>
                <h3 className='mb-3'>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
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
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea
                            type="text"
                            rows="10"
                            className="form-control"
                            name="content"
                            value={content}
                            onChange={this.onChangeInput}
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
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Save Changes"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const navSpace = {
    marginTop: "76px" 
}