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
            header_img: '',
            title: '',
            topics: '',
            published: new Date(),
            content: '',
            
        }
    }

    componentDidMount() {
        axios.get('/pubs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    header_img: response.data.header_img,
                    title: response.data.title,
                    topics: response.data.topics,
                    content: response.data.content,
                    published: new Date(response.data.published)
                })
            })
            .catch(err => {
                console.log(err)
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
            header_img: this.state.header_img,
            title: this.state.title,
            topics: this.state.topics,
            published: this.state.published,
            content: this.state.content,
        }

        console.log(post)

        axios.post('/pubs/update/'+this.props.match.params.id, post)
            .then(res => console.log(res.data))

        window.location = '/admin/posts'
    }

    render() {
        const { header_img, title, topics, content, published } = this.state
        return (
            <div className="container" style={stickyHeader}>
                <h3 className='mb-3'>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Header Image Link:</label>
                        <input
                            type="url"
                            className="form-control"
                            name="header_img"
                            value={header_img}
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

const stickyHeader = {
    marginTop: "calc(70px + 3%)",
}