import React from "react";
import '../App.css';

const CarouselCards = (props) => {
    return (
        <div style={{ width: '120px', padding: '5px', float: 'left' }}>
            <div className="cards-multiple" onClick={(event) => props.click(
                event,
                props.cards.structValue.fields.text.stringValue
            )}>
                <div style={{ padding: '10px' }}>
                    <div className="image-cropper">
                        <img src={props.cards.structValue.fields.image.stringValue} alt={props.cards.structValue.fields.image.stringValue} className="cards-image" />
                    </div>
                    <div className="card-subsubsubtitle center-align" style={{paddingTop:'3%'}}>
                        {props.cards.structValue.fields.text.stringValue}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarouselCards;