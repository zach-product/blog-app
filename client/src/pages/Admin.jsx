import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { NavBarAdmin, Posts, CreatePost, EditPost, PreviewPost, Drafts, Login } from '../components';

export class Admin extends Component {
    constructor(props) {
        super(props)

        this.toggleIsLoggedIn = this.toggleIsLoggedIn.bind(this)
        
        this.state = {
            isLoggedIn: false,
        }
    }

    toggleIsLoggedIn() {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        })
    }
    render() {
        const {isLoggedIn} = this.state
        if (!isLoggedIn) { 
            return <Login toggleIsLoggedIn={this.toggleIsLoggedIn} /> 
        } else {
            return (
                <Router>
                    <NavBarAdmin />
                    <Switch>
                        <Route path="/admin/posts" exact component={Posts} />
                        <Route path="/admin/drafts" exact component={Drafts} />
                        <Route path="/admin/create" component={CreatePost} />
                        <Route path="/admin/edit/:id" component={EditPost} />
                        <Route path="/admin/preview/:id" component={PreviewPost} />
                        <Redirect from="/admin" to="/admin/posts" />
                    </Switch>
                </Router>
            )
        }
    }
}

export default Admin
