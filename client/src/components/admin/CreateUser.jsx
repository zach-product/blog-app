import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstname: '',
            lastname: '',
            shortbio: '',
        }
    }

    onChangeInput(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        })
    }

    onSubmit(e) {
        e.preventDefault()
        
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            shortbio: this.state.shortbio,
        }

        console.log(user)

        axios.post('http://localhost:3000/users/add', user)
            .then(res => console.log(res.data))

        this.setState({
            firstname: '',
            lastname: '',
            shortbio: '',
        })
    }

    render() {
        const { firstname, lastname, shortbio } = this.state
        return (
            <div className="container" style={navSpace}>
                <h3 className='mb-3'>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            value={firstname}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            value={lastname}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>Short Bio:</label>
                        <textarea
                            type="text"
                            rows="5"
                            className="form-control"
                            name="shortbio"
                            value={shortbio}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Create New User"
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