import React from "react";
import '../App.css';

const QuickReplies = (props) => {
    return (
        <div className="chip">
            <a href="/" onClick={(event) => props.click(
                event,
                props.reply.structValue.fields.payload.stringValue,
                props.reply.structValue.fields.text.stringValue
            )}>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        </div>
    )
};

export default QuickReplies;