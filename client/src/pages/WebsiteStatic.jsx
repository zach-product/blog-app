import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Home, About, Portfolio, ProjectAlchemist, ProjectSignOnSite, Blog, Post1 } from '../components';

export default class Website extends Component {
    render() {
        return ( 
            <Router>
                <Switch>
                    <Route path="/about" exact component={About} />
                    <Route path="/portfolio" exact component={Portfolio} />
                    <Route path="/portfolio/alchemist" component={ProjectAlchemist} />
                    <Route path="/portfolio/signonsite" component={ProjectSignOnSite} />
                    <Route path="/blog" exact component={Blog} />
                    <Route path="/blog/post1" component={Post1} />
                    <Route path="/" exact component={Home} />
                    <Redirect from="*" to="/" />  
                </Switch>
            </Router>
        )
    }
}