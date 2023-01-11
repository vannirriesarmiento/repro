import React, { Component } from 'react';
import QuickReplies from './QuickReplies';
import QuickRepliesDefinition from './QuickRepliesDefinition';

class QuickRepliesHandler extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);

        this.state = {
            loading: [true]
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1550);
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
            })
        } else {
            return null;
        }
    }

    renderQuickReply(reply, i) {
        if (this.props.type === "definition") {
            return <QuickRepliesDefinition key={i} click={this._handleClick} reply={reply} />
        } else {
            return <QuickReplies key={i} click={this._handleClick} reply={reply} />
        }
    }

    render() {
        return (
            <>
                <div id="quick-replies">
                    {this.props.text &&
                        <p>
                            {this.props.text.stringValue}
                        </p>
                    }
                    {this.renderQuickReplies(this.props.payload)}
                </div>

            </>
        )
    }
}

export default QuickRepliesHandler;