import React from "react";
import '../App.css';

import Modal from './ModalLocation';

const Card = (props) => {
    return (
        <div style={{ width: '100%' }}>
            <div className="cards">
                <div>
                    <span className="card-title">{props.payload.fields.header.stringValue}</span>
                    <div className="card-content">
                        <div dangerouslySetInnerHTML={{ __html: props.payload.fields.description.stringValue }}></div>
                    </div>
                    <br></br>
                    <div className="container-fluid">
                        <div className="btn"><Modal /></div>

                        <button href={props.payload.fields.link.stringValue} className="btn">
                            <div className="valign-wrapper">
                                <span className="material-icons md-dark pr-3">link</span>&nbsp;&nbsp;
                                <a target="_blank" className="black-text" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>
                                    {props.payload.fields.text.stringValue}
                                </a>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;