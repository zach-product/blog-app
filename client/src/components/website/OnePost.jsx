import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { NavBar } from '..';
import { Editor, EditorState, convertFromRaw } from 'draft-js'

export default class OnePost extends Component {
    constructor(props) {
        super(props)

        // this.renderContent = this.renderContent.bind(this)

        this.state = {
            title: '',
            author: '',
            topics: [],
            content: '',
            published: new Date(),
            editorState: ''
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
                    published: new Date(response.data.published),
                    // editorState: '',
                })
            })
            .catch(err => {
                console.log(err)
            })
        
        this.setState({
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content)))
        })
    }

    // renderContent(content) {
    //     const contentState = convertFromRaw(JSON.parse(content));
    //     const cleanedContent = EditorState.createWithContent(contentState);
    //     this.setState({
    //         editorState: cleanedContent
    //     })
    // }

    render() {
        const { title, topics, published, editorState} = this.state
        // const contentState = convertFromRaw(JSON.parse(content));
        // const editorState = EditorState.createWithContent(contentState);
        return (
            <React.Fragment>
                <NavBar />
                <div className="container" style={stickyHeader}>
                    <div className="col-12 col-lg-10 offset-lg-1 pt-4">
                        <h1 className="mb-3">{title}</h1>
                        {topics.map(item => {
                            return <p className='btn btn-secondary btn-sm disabled mr-2 mb-2'>{item}</p>
                        })}
                        <p style={fontStyling} className="font-italic float-lg-right my-2">{moment(published).format("MMMM D, YYYY")}</p>
                        <hr className="mb-4" />
                        <div><Editor editorState={editorState} readOnly={true} /></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

// const contentStyling = {
//     fontSize: "20px",
//     fontWeight: "300",
// }

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}

const fontStyling = {
    fontSize: "20px",
    fontWeight: "300",
}