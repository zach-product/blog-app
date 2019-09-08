import React from 'react'
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleButton from '../blockStyles/BlockStyleButton'

export const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: " “ ” ", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "{ }", style: 'code-block' },
];

export function getBlockStyle(block) {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
}

export default class BlockStyleToolbar extends React.Component {
    render() {
        const { editorState } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
        
        return (
        <div>
            <span className="RichEditor-controls">
                {BLOCK_TYPES.map(type => {
                    return (
                        <BlockStyleButton
                            active={type.style === blockType}
                            label={type.label}
                            onToggle={this.props.onToggle}
                            style={type.style}
                            key={type.label}
                            type={type}
                        />
                    );
                })}
            </span>
        </div>
        );
    }
}