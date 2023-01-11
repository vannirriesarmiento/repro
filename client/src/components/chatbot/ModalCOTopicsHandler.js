import React, { Component } from 'react';
import ModalCOTopics from './ModalCOTopics';

class ModalCOTopicsHandler extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);

        this.state = {
            loading: [true]
        }
    }

    _handleClick(event, text) {
        this.props.replyClick(event, text);
    }

    renderModalCOTopics(cotopics) {
        return <ModalCOTopics click={this._handleClick} cotopic={cotopics} />
    }
    render() {
        return (
            <>
                {this.renderModalCOTopics(this.props.payload)}
            </>
        )
    }
}

export default ModalCOTopicsHandler;