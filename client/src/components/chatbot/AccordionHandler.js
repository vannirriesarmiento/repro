import React, { Component } from 'react';
import Accordion from './Accordion';

class AccordionHandler extends Component {
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

    renderAccordionHandler(accordion) {
        if (accordion) {
            return accordion.map((accordion, i) => {
                return this.renderAccordion(accordion, i);
            })
        } else {
            return null;
        }
    }

    renderAccordion(accordion, i) {
        return <Accordion key={i} click={this._handleClick} accordion={accordion} />
    }

    render() {
        return (
            <>
                {this.props.text &&
                    <p>
                        {this.props.text.stringValue}
                    </p>
                }
                {this.renderAccordion(this.props.payload)}
            </>
        )
    }
}

export default AccordionHandler;