import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Website, Admin } from './pages'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/" component={Website} />                
            </Switch>
        </Router>
    )
}

export default App
