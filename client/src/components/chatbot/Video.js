import React from 'react';
import '../App.css';

const Video = (props) => {

    return (
        <div style={{ width: '100%', marginBottom:'6px' }}>
            <div className="cards">
                <div>
                    <span className="card-title">{props.payload.title.stringValue}</span>
                    <div className="card-content">
                        <span dangerouslySetInnerHTML={{ __html: props.payload.embeddedcode.stringValue }}></span>
                    </div>
                </div>
                <div className="card-source">
                    <div className="valign-wrapper">
                        From &nbsp;<a target="_blank" rel="noopener noreferrer" href={props.payload.link.stringValue}>
                            {props.payload.source.stringValue}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Video;