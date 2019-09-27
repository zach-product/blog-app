import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const Post = props => (
    <tr>
        <td className="align-middle"><img className="thumbnail" src={props.post.mainImgPath} alt={props.post.mainImgName} style={tableImg} /></td>
        <td className="align-middle">{props.post.title}</td>
        <td className="align-middle">
        {props.post.topics.map((topic, index) => {
            return <p key={index} className='btn btn-secondary btn-sm disabled mr-1 mb-1'>{topic}</p>
        })}
        </td>
        <td className="align-middle">{ props.post.published === undefined ? <i>Draft</i> : moment(props.post.published).format("MM/DD/YY") } </td>
        <td className="align-middle">
            <Link className="btn btn-secondary" to={"/admin/edit/"+props.post._id}><i className="fa fa-edit m-2"></i></Link>
            <Link className="btn btn-success ml-2" to={"/admin/preview/"+props.post._id}><i className="fa fa-eye m-2"></i></Link>
            <Link to="/admin/drafts" className="btn btn-danger ml-2" onClick={() => { props.deletePost(props.post._id)}}><i className="fa fa-trash m-2"></i></Link>
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
        axios.get('/pubs/drafts')
            .then(response => {
                this.setState({ posts: response.data })
            })
            .catch((err => {
                console.log(err)
            }))
    }

    deletePost(id) {
        axios.delete('/pubs/'+id)
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
            <div className="container" style={stickyHeader}>
                <div className="d-inline align-middle">
                    <h3 className="float-left ml-2 mb-3">Drafts</h3>
                </div>
                <table className="table table-fixed" >
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }} scope="col">Header Pic</th>
                            <th style={{ width: '25%' }} scope="col">Title</th>
                            <th style={{ width: '25%' }} scope="col">Topics</th>
                            <th style={{ width: '15%' }} scope="col">Published</th>
                            <th style={{ width: '20%' }} scope="col"></th>
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

const stickyHeader = {
    marginTop: "calc(70px + 3%)"
}

const tableImg = {
    display: "block",
    height: "auto",
    width: "100%"
}