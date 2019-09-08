import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { WebsiteStatic } from './pages'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={WebsiteStatic} />
            </Switch>
        </Router>
    )
}

export default App
