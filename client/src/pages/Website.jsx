import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Home, About, Portfolio, ProjectAlchemist, ProjectSignOnSite, Blog, Post } from '../components';

export default class Website extends Component {
    render() {
        return ( 
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/portfolio" exact component={Portfolio} />
                    <Route path="/portfolio/alchemist" component={ProjectAlchemist} />
                    <Route path="/portfolio/signonsite" component={ProjectSignOnSite} />
                    <Route path="/blog" exact component={Blog} />
                    <Route path="/blog/:id" component={Post} />
                    <Redirect from="*" to="/" />  
                </Switch>
            </Router>
        )
    }
}