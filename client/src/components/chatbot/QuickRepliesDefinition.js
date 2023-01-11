import React from "react";
import '../App.css';

const QuickRepliesDefinition = (props) => {
    return (
        <div className="chip">
            <a href="/" onClick={(event) => props.click(
                event,
                props.reply.structValue.fields.payload.stringValue,
                props.reply.structValue.fields.text.stringValue
            )} data-tooltip={props.reply.structValue.fields.meaning.stringValue}>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        </div>
    )
};

export default QuickRepliesDefinition;