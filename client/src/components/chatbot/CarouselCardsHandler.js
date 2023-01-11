import React, { Component } from 'react';
import CarouselCards from './CarouselCards';
import '../App.css';

class CarouselCardsHandler extends Component {
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

    renderCards(cards) {
        if (cards) {
            return cards.map((cards, i) => {
                return this.renderEachCards(cards, i);
            })
        } else {
            return null;
        }
    }

    renderEachCards(cards, i) {
        return <CarouselCards key={i} click={this._handleClick} cards={cards} />
    }

    render() {
        return (
            <>
                {this.props.text &&
                    <p>
                        {this.props.text.stringValue}
                    </p>
                }
                {this.renderCards(this.props.payload)}
            </>
        )
    }
}

export default CarouselCardsHandler;