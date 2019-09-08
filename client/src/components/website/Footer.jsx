import React, { Component } from 'react'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

export default class Footer extends Component {
    render() {
        return (
           <footer className="footer fixed-bottom" style={footerStyle}>
               <div className="container text-center align-items-center py-2">
                <a href="https://www.linkedin.com/in/zachpritchard" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin m-2" style={socialIcon} ></i></a>
                <a href="https://www.twitter.com/lifeofzachp" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter m-2" style={socialIcon}></i></a>
                <a href="https://www.angel.co/zachp" target="_blank" rel="noopener noreferrer"><i className="fa fa-angellist m-2" style={socialIcon}></i></a>
                {/* <a href="https://github.com/zach-product" target="_blank" rel="noopener noreferrer"><i className="fa fa-github m-2" style={socialIcon}></i></a> */}
               </div>
           </footer>
        )
    }
}

const footerStyle = {
    background: "#F6F9fC",
    maxHeight: "60px",
}

const socialIcon = {
    fontSize: '18px',
    color: '#1e2958'
}
