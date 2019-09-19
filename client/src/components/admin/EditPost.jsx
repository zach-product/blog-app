import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class EditPost extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangePublished = this.onChangePublished.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            header_pic: '',
            title: '',
            topics: '',
            published: new Date(),
            intro: '', 
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
                    published: new Date(response.data.published),
                    intro: response.data.intro,
                    intro: response.data.closing,
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

    cleanInputArray(e) {
        const name = e.target.name
        const value = e.target.value
        const arr = value.split(",").map(item => item.trim())
        console.log(arr)
        this.setState({ [name]: arr })
    }

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

        axios.post('/pubs/update/'+this.props.match.params.id, post)
            .then(res => console.log(res.data))

        window.location = '/admin/posts'
    }

    render() {
        const { header_pic, title, topics, published, intro, closing } = this.state
        return (
            <div className="container" style={stickyHeader}>
                <h3 className='mb-3'>Edit Post</h3>
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
    marginTop: "calc(30px + 3%)",
}