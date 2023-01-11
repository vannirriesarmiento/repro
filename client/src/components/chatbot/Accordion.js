import React, { useState } from "react";
import '../App.css';

const Accordion = (props) => {

    const [hidebtn, sethidebtn] = useState(false);

    return (
        <>
            <details open>
                <summary className="card-title">
                    Individual Client Record
                </summary>
                <div className="content">
                    <div className="row">
                        <div className="col-12"><b style={{ fontSize: 'large' }}>{props.accordion.structValue.fields.name.stringValue}</b></div>
                        <div className="col">
                            <small>Age:</small><br />
                            {props.accordion.structValue.fields.age.stringValue}<br />
                            <small>Sex:</small><br />
                            {props.accordion.structValue.fields.sex.stringValue}<br />
                            <small>Group:</small><br />
                            {props.accordion.structValue.fields.group.stringValue}<br />
                        </div>
                        <div className="col">
                            <small>Birthdate:</small><br />
                            {props.accordion.structValue.fields.birthdate.stringValue}<br />
                            <small>Civil Status:</small><br />
                            {props.accordion.structValue.fields.civilstatus.stringValue}<br />
                            <small>Contact Number:</small><br />
                            {props.accordion.structValue.fields.phonenumber.stringValue}<br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <small>Address:</small><br />
                            {props.accordion.structValue.fields.address.stringValue}
                        </div>
                    </div>
                    <div className="row" style={{ flexShrink: 'none !important'}}>
                        <div className="col">
                            <p className="smallwarning pb-2">
                                <br /><b>NOTE:</b> Information above will not be saved, stored, copied, nor sent without permission. Users have full access and the right to withdraw.
                            </p>
                        </div>
                        {!hidebtn &&
                            <div className="container-fluid center-align pb-2">
                                <button className="btn col" type="submit" name="action" id="btn" onClick={(event) => {
                                    props.click(
                                        event, props.accordion.structValue.fields.button1.stringValue); sethidebtn(true);
                                }}>
                                    {props.accordion.structValue.fields.button1.stringValue}
                                </button>
                                <button className="btn col" type="submit" name="action" id="btn" onClick={(event) => {
                                    props.click(
                                        event, props.accordion.structValue.fields.button2.stringValue); sethidebtn(true);
                                }}>
                                    {props.accordion.structValue.fields.button2.stringValue}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </details>
        </>
    );
}

export default Accordion;