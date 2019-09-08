import React from "react"

export default class BlockStyleButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSelected: false
        }
    }

    onToggle = (e) => {
        e.preventDefault()
        this.props.onToggle(this.props.style)

        this.setState({ isSelected: !this.state.isSelected })
    }
    render() {
        return (
            <button style={ this.state.isSelected ? blocktypeSelected : null} className="btn btn-square mr-2" onClick={this.onToggle}>
            {this.props.label}
            </button>
        );
    }
}

const blocktypeSelected = {
    background: "#D3D3D3"
}
