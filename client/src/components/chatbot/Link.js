import React from "react";
import '../App.css';

const Link = (props) => {
    return (
        <div className="chip">
            <div className="row">
                <div className="valign-wrapper">
                <span className="material-icons md-dark col-1 align-middle">link</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="col-11" target="_blank" rel="noopener noreferrer" href={props.payload.structValue.fields.link.stringValue}>{props.payload.structValue.fields.text.stringValue}</a>
            </div></div>
        </div>
    );
}

export default Link;