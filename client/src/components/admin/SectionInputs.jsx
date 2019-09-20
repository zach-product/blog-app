import React from 'react'

const SectionInputs = props => {
    return (
        props.sections.map((val, idx) => {
            let sectId = `sect-${idx}`, contId = `cont-${idx}`
            return (
                <div className="py-3" key={idx}>
                    <div className="form-group">
                        <label htmlFor={sectId}>{`Section #${idx + 1}`}</label>
                        <input
                            type="text"
                            name={sectId}
                            data-id={idx}
                            id={sectId}
                            title="header"
                            className="form-control"
                            value={props.sections[idx].header}
                            onChange={props.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={contId}>Content</label>
                        <textarea
                            type="text"
                            rows="5"
                            name={contId}
                            data-id={idx}
                            id={contId}
                            title="content"
                            className="form-control"
                            value={props.sections[idx].content}
                            onChange={props.onChangeInput}
                        />
                    </div>
                </div>
            )
        })
    )
}

export default SectionInputs