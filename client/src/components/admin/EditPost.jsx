import React, { Component } from 'react'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import SectionInputs from './SectionInputs'

export default class EditPost extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangePublished = this.onChangePublished.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.addSect = this.addSect.bind(this)
        this.publishPost = this.publishPost.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
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

    componentDidMount() {
        axios.get('/pubs/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    header_pic: response.data.header_pic,
                    title: response.data.title,
                    topics: response.data.topics,
                    intro: response.data.intro,
                    sections: response.data.sections,
                    closing: response.data.closing,
                })
            })
            .catch(err => {
                console.log(err)
            })
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

    addSect(e) {
        e.preventDefault()
        this.setState(prevState => ({
            sections: [...prevState.sections, { header: '', content: '' }],
        }))
    }

    publishPost(e) {
        e.preventDefault()

        const post = {
            header_pic: this.state.header_pic,
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

    

    onSubmit(e) {
        e.preventDefault()

        const post = {
            header_pic: this.state.header_pic,
            title: this.state.title,
            topics: this.state.topics,
            intro: this.state.intro,
            sections: this.state.sections,
            closing: this.state.closing,
        }

        console.log(post)

        axios.post('/pubs/update/'+this.props.match.params.id, post)
            .then(res => console.log(res.data))

        window.location = '/admin/drafts'
    }

    render() {
        const { header_pic, title, topics, intro, sections, closing } = this.state
        return (
            <div className="container" style={stickyHeader}>
                <h3 className='mb-3'>Edit Post</h3>
                <form>
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
                            value="Save Changes"
                            onClick={this.onSubmit}
                        />
                        <input
                            type="submit"
                            className="btn btn-success"
                            value="Publish Post"
                            onClick={this.publishPost}
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