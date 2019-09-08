import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const Post = props => (
    <tr>
        <td className="align-middle">{props.post.title}</td>
        <td className="align-middle">{props.post.author}</td>
        <td className="align-middle">{props.post.topics.join(", ")}</td>
        <td className="align-middle">{moment(props.post.published).format("MMMM D, YYYY")}</td>
        <td className="align-middle">
            <Link className="btn btn-secondary" to={"/admin/posts/edit/"+props.post._id}>EDIT</Link><Link to="/admin/posts" className="btn btn-danger ml-2" onClick={() => { props.deletePost(props.post._id)}}>DELETE</Link>
        </td>
    </tr>
)

export default class Posts extends Component {
    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this)
        
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/pubs/')
            .then(response => {
                this.setState({ posts: response.data })
            })
            .catch((err => {
                console.log(err)
            }))
    }

    deletePost(id) {
        axios.delete('http://localhost:3000/pubs/'+id)
            .then(res => console.log(res.data))
        
        this.setState({
            posts: this.state.posts.filter(el => el._id !== id)
        })
    }

    postList() {
        return this.state.posts.map(currentpost => {
            return  <Post post={currentpost} deletePost={this.deletePost} key={currentpost._id} />
        })
    }

    render() { 
        return (
            <div className="container" style={navSpace}>
                <div className="d-inline align-middle">
                    <h3 className="float-left mb-3">Posts</h3>
                    <Link className="btn btn-primary font-weight-bold float-right" to="/admin/posts/create" role="button">Create New Post</Link>
                </div>
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Authors</th>
                            <th scope="col">Topics</th>
                            <th scope="col">Published</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.postList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

const navSpace = {
    marginTop: "76px" 
}