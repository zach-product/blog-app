import React, { Component } from 'react'
import axios from 'axios'
import SectionInputs from './SectionInputs';
import DefaultImg from './../../assets/default-img.jpg'

export default class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.uploadImage = this.uploadImage.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
        this.cleanInputArray = this.cleanInputArray.bind(this)
        this.titleToPostId = this.titleToPostId.bind(this)
        this.addSect = this.addSect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            imgPreview: DefaultImg,
            postId: '',
            mainImgName: '',
            mainImgPath: '',            
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

    setDefaultImage() {
        this.setState({
            imgPreview: DefaultImg
        })
    }

    uploadImage(e) {
        let imageFormObj = new FormData()

        imageFormObj.append('imageName',  e.target.files[0].name)
        imageFormObj.append('imageData', e.target.files[0])

        this.setState({
            imgPreview: URL.createObjectURL(e.target.files[0]),
            mainImgName: e.target.files[0].name,
            mainImgPath: "./../../../../uploads/" + e.target.files[0].name
        })

        axios.post('/image/upload', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    console.log('Image has been successfully uploaded!')
                }
            })
            .catch((err) => {
                alert('Error while uploading image')
                this.setDefaultImage()
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

    titleToPostId(title) {
        const trimmed = title.trim()
        const replaced = trimmed.split(' ').join('-')
        const lowercase = replaced.toLowerCase()
        return lowercase
    }

    cleanInputArray(e) {
        const name = e.target.name
        const value = e.target.value
        const arr = value.split(",").map(item => item.toLowerCase())
        console.log(arr)
        this.setState({ [name]: arr })
    }

    addSect(e) {
        e.preventDefault()
        this.setState(prevState => ({
            sections: [...prevState.sections, { header: '', content: '' }],
        }))
    }

    onSubmit(e) {
        e.preventDefault()
       
        const post = {
            postId: this.titleToPostId(this.state.title),
            mainImgName: this.state.mainImgName,
            mainImgPath: this.state.mainImgPath,
            title: this.state.title,
            topics: this.state.topics,
            sections: this.state.sections,
            intro: this.state.intro,
            closing: this.state.closing,
        } 

        console.log(post)

        axios.post('/pubs/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/admin/drafts'
    }

    render() {
        const { imgPreview, title, topics, intro, sections, closing } = this.state
        return (
            <div className="container" style={stickyHeader}>
                <div className="col-12 col-lg-10 offset-lg-1">
                    <h2 className='mb-2'>Create New Post</h2>
                    <hr className="mb-4" />
                    <form onSubmit={this.onSubmit}>
                        <img src={imgPreview} alt='upload' className="thumbnail mb-3" style={previewImg} />
                        <input type="file" className="btn mb-4" onChange={this.uploadImage} />
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
    marginTop: "calc(70px + 3%)"
}

const previewImg = {
    maxHeight: "200px",
    width: "auto"
}