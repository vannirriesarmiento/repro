import React from 'react';
import '../App.css';

const Message = (props) => {

    return (
        <>
            <div className='imessage'>
                <p className="from-them">
                    <span dangerouslySetInnerHTML={{ __html: props.payload.structValue.fields.message.stringValue }}></span>
                </p>
            </div>
        </>
    )
};

export default Message;