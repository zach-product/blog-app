import React, { Component } from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createHighlightPlugin from '../plugins/highlightPlugin'
import addLinkPlugin from '../plugins/addLinkPlugin'
import BlockStyleToolbar,{ getBlockStyle } from '../blockStyles/BlockStyleToolbar';
import '../../App.css'

const highlightPlugin = createHighlightPlugin()

export default class ContentEditor extends Component {
    constructor(props){
        super(props)

        this.state = {
            editorState: EditorState.createEmpty()
        }

        this.plugins = [
            highlightPlugin,
            addLinkPlugin,
        ]
    }

    sendContent(content) {
        JSON.stringify(convertToRaw(content));
        this.props.onChangeContent(content)
    }

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent()
        this.sendContent(contentState)
        this.setState({
            editorState
        })
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

        if (newState) {
            this.onChange(newState)
            return 'handled'
        }

        return 'not-handled'
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }
    
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }   

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }
    
    onStrikeThroughClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'))
    }

    onHighlightClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
    }
    
    onAddLinkClick = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Paste the link below...')
        if (!link) {
          this.onChange(RichUtils.toggleLink(editorState, selection, null));
          return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
        };
    
    render() {
        return (
            <React.Fragment>
                <hr />
                <div style={editorContainer}>
                    <div className="row m-1">
                        <BlockStyleToolbar
                            editorState={this.state.editorState}
                            onToggle={this.toggleBlockType}
                        />
                        <button className="btn btn-square mr-2" onClick={this.onUnderlineClick}><u>U</u></button>
                        <button className="btn btn-square mr-2" onClick={this.onBoldClick}><b>B</b></button>
                        <button className="btn btn-square mr-2" onClick={this.onItalicClick}><em>I</em></button>
                        <button className="btn btn-square mr-2" onClick={this.onStrikeThroughClick}><strike>abc</strike></button>
                        <button className="btn btn-square mr-2" onClick={this.onHighlightClick}><span style={{ background: "yellow" }}>H</span></button>
                        <button className="btn btn-square mr-2" onClick={this.onAddLinkClick}><i className="fa fa-paperclip"></i></button>
                    </div>
                    <div className="mt-3">
                        <Editor 
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            blockStyleFn={getBlockStyle}
                            plugins={this.plugins}
                        />
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}

const editorContainer = {
    
}



