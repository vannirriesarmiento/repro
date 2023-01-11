import React from "react";
import '../App.css';

import Modal from './ModalLocation';

const Recommendation = (props) => {
    let testlist = "", test = "";

    let status = props.payload.fields.status.stringValue;
    
    if (status === "1") {
        test = props.payload.fields.test.stringValue;
    } else if (status === "2") {
        test = props.payload.fields.test.listValue.values;
    }

    if (status === "2") {
        for (var i = 0; i < test.length; i++) {
            testlist = "<li>" + test[i].stringValue + "</li>" + testlist;
        }
    }

    return (

        <div style={{ width: '100%' }}>
            <div className="cards">
                <div>
                    <span className="card-title">Repro's Recommendation!</span>
                    <img src={props.payload.fields.image.stringValue} style={{ width: '96%', marginLeft: '2%', marginRight: '2%' }} alt="Repro's Recommendation" />
                    {status === "2" ? (
                        <>
                            <p>These are the following tests most applicable for you. </p>
                            <ol style={{ marginTop: '0px' }}>
                                <div className='card-subtitle' dangerouslySetInnerHTML={{ __html: testlist }}></div>
                            </ol>
                        </>
                    ) : (
                        <ol style={{ marginTop: '0px' }}>
                            <li className="card-subtitle" style={{ marginBottom: "10px !important" }}>{props.payload.fields.test.stringValue}</li>
                        </ol>
                    )}
                    {props.payload.fields.cost.stringValue === "0" &&
                        <></>
                    }
                    {props.payload.fields.cost.stringValue === "Free" &&
                        <>
                            <hr />
                            <span className="right card-subsubtitle" stylle="margin:0px;">TOTAL COST: <span style={{ color: 'red' }}>
                                {props.payload.fields.cost.stringValue}
                            </span></span><br /><br />
                        </>
                    }
                    {props.payload.fields.cost.stringValue === "160" &&
                        <>
                            <hr />
                            <span className="right card-subsubtitle" stylle="margin:0px;">TOTAL COST: <span style={{ color: 'red' }}>
                                PHP {props.payload.fields.cost.stringValue}
                            </span></span><br /><br />
                        </>
                    }
                    {props.payload.fields.description.stringValue ? (
                        <p style={{ textAlign: 'justify', marginBottom: '10px', marginTop: '10px' }}>{props.payload.fields.description.stringValue}</p>
                    ) : (
                        <></>
                    )}
                    <p style={{ textAlign: 'justify' }}>
                        All Testing &amp; Screening will be held at the Reproductive Health &amp; Wellness Center (RHWC). Located at Jacinto St., beside Jacinto Health Center. No appointment needed. Results released after 1-2 hrs. You may bring 1 valid ID. Open from 9am to 3pm, Monday to Friday except holidays.
                    </p>
                    <p className="smallwarning">
                        <b>NOTE:</b>  The recommendation is a result of a rule-based approach, hence pre-defined rules are set to make deductions. This may not always guarantee accurancy for only common symptoms are considered. Always rely on professional advice.
                    </p>
                    {status === "2" && (<div className="card-action link"><Modal /></div>)}
                </div>
            </div>
        </div>
    )
}

export default Recommendation;