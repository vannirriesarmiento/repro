import React, { useState } from "react";
import '../App.css';

import pic1 from "../img/topic-img (1).png";
//import pic2 from "../img/topic-img (2).png";
import pic3 from "../img/topic-img (3).png";
import pic4 from "../img/topic-img (4).png";

const ModalCOTopics = (props) => {
    const [modal, setModal] = useState(false);
    const [hideQ1, sethideQ1] = useState(true);
    const [hideQ1R1, sethideQ1R1] = useState(false);
    const [hideQ1R2, sethideQ1R2] = useState(true);
    const [hideQ2, sethideQ2] = useState(true);
    const [hideQ2R1, sethideQ2R1] = useState(false);
    const [hideQ2R2, sethideQ2R2] = useState(true);
    const [hideQ3, sethideQ3] = useState(true);

    const isMobile = window.innerWidth <= 1000;

    const toggleModal = (e) => {
        setModal(!modal);
        e.preventDefault();
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const showQs = (id) => {
        if (id === 'Q1') {
            sethideQ1(!hideQ1)
        } else if (id === 'Q2') {
            sethideQ2(!hideQ2)
        } else if (id === 'Q3') {
            sethideQ3(!hideQ3)
        }
        var el = document.getElementById(id);

        if (el) {
            if (hideQ1 || hideQ2 || hideQ3) {
                el.style.display = 'none';
            } else {
                el.style.display = 'inline';
            }
        }
    }

    const content = () => {
        return (
            <>
                <div className="topic-card" onClick={() => { showQs('Q1') }}>
                    <div className="valign-wrapper">
                        <div className="row">
                            <div className="col-2">
                                <img className="rounded-circle" src={pic4} width="100%" alt="" />
                            </div>
                            <div className="col">
                                <h6>Sexual & Reproductive Wellness</h6>
                                <p>Reproduction, STIs, birth control, pregnancy, and so on.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {!hideQ1 &&
                    <div id="Q1">
                        {!hideQ1R1 &&
                            <div className="row" id="Q1R1" >
                                <div className="col">
                                    <a href="#Q1" onClick={(e) => { setModal(false); props.click(e, "Is COVID-19 an STI?") }}>Is COVID-19 an STI?</a><br />
                                    <a href="#Q2" onClick={(e) => { setModal(false); props.click(e, "How can I get free or low-cost STI tests and services?") }}>{isMobile ? (<>How can I get low-cost STI services?</>) : (<>How can I get free or low-cost STI tests and services?</>)}</a><br />
                                    <a href="#Q3" onClick={(e) => { setModal(false); props.click(e, "What are the symptoms of syphilis?") }}>{isMobile ? (<>What are the symptoms of syphilis? HIV? etc?</>) : (<>What are the symptoms of syphilis? gonorrhea? trichomoniasis? etc.</>)}</a><br />
                                    <a href="#Q4" onClick={(e) => { setModal(false); props.click(e, "What's the difference between confidential and anonymous testing?") }}>{isMobile ? (<>Difference of confidential to anonymous tests?</>) : (<>What's the difference between confidential and anonymous testing?</>)}</a>
                                </div>
                                <div className="col-1 valign-wrapper">
                                    <div className="topic-card-link" onClick={() => { sethideQ1R2(false); sethideQ1R1(true) }}><i className="material-icons">chevron_right</i></div>
                                </div>
                            </div>}

                        {!hideQ1R2 &&
                            <div className="row" id="Q1R2">
                                <div className="col">
                                    <a href="#Q5" onClick={(e) => { setModal(false); props.click(e, "What types of pregnancy tests are available?") }}>What types of pregnancy tests are available?</a><br />
                                    <a href="#Q6" onClick={(e) => { setModal(false); props.click(e, "How do I find out if a guy I had sex with has an STD?") }}>How do I find out if a guy I had sex with has an STD?</a><br />
                                    <a href="#Q7" onClick={(e) => { setModal(false); props.click(e, "Should STI testing be performed frequently?") }}>{isMobile ? (<>Should STI testing be performed frequently?</>) : (<>Should STI testing be performed frequently? How often?</>)}</a><br />
                                    <a href="#Q8" onClick={(e) => { setModal(false); props.click(e, "Can I get pregnant with withdrawal method?") }}>Can I get pregnant with withdrawal method?</a>
                                </div>
                                <div className="col-1 valign-wrapper">
                                    <div className="topic-card-link" onClick={() => { sethideQ1R1(false); sethideQ1R2(true); }}><i className="material-icons">chevron_left</i></div>
                                </div>
                            </div>}
                    </div>}

                <div className="topic-card" onClick={() => { showQs('Q2') }}>
                    <div className="valign-wrapper">
                        <div className="row">
                            <div className="col-2">
                                <img className="rounded-circle" src={pic3} width="100%" alt="" />
                            </div>
                            <div className="col">
                                <h6>Human Development</h6>
                                <p>Body anatomy, menstruation, and puberty.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {!hideQ2 &&
                    <div id="Q2">
                        {!hideQ2R1 &&
                            <div className="row" id="Q1R1" >
                                <div className="col">
                                    <a href="#Q1" onClick={(e) => { setModal(false); props.click(e, "How do you use a tampon?") }}>How do you use a tampon?</a><br />
                                    <a href="#Q2" onClick={(e) => { setModal(false); props.click(e, "What should I do about my sexual feelings?") }}>What should I do about my sexual feelings?</a><br />
                                    <a href="#Q3" onClick={(e) => { setModal(false); props.click(e, "Can masturbation stunt my growth?") }}>Can masturbation stunt my growth?</a><br />
                                    <a href="#Q4" onClick={(e) => { setModal(false); props.click(e, "Does touching a girl's breasts make them grow?") }}>Does touching a girl's breasts make them grow?</a>
                                </div>
                                <div className="col-1 valign-wrapper">
                                    <div className="topic-card-link" onClick={() => { sethideQ2R2(false); sethideQ2R1(true) }}><i className="material-icons">chevron_right</i></div>
                                </div>
                            </div>}

                        {!hideQ2R2 &&
                            <div className="row" id="Q1R2">
                                <div className="col">
                                    <a href="#Q5" onClick={(e) => { setModal(false); props.click(e, "Why does the penis sometimes not erect properly?") }}>Why does the penis sometimes not erect properly?</a><br />
                                    <a href="#Q6" onClick={(e) => { setModal(false); props.click(e, "Is it normal for one testicle to be bigger?") }}>Is it normal for one testicle to be bigger?</a><br />
                                    <a href="#Q7" onClick={(e) => { setModal(false); props.click(e, "What are remedies for dysmenorrhea?") }}>What are remedies for dysmenorrhea?</a><br />
                                    <a href="#Q8" onClick={(e) => { setModal(false); props.click(e, "What is a menopause? When does it start?") }}>What is a menopause? When does it start?</a>
                                </div>
                                <div className="col-1 valign-wrapper">
                                    <div className="topic-card-link" onClick={() => { sethideQ2R1(false); sethideQ2R2(true); }}><i className="material-icons">chevron_left</i></div>
                                </div>
                            </div>}
                    </div>}

                <div className="topic-card" onClick={() => { showQs('Q3') }}>
                    <div className="row">
                        <div className="col-2">
                            <img className="rounded-circle" src={pic1} width="100%" alt="" />
                        </div>
                        <div className="col">
                            <h6>Society & Culture</h6>
                            <p>Relationships, sexual orientation, and reproductive freedom.</p>
                        </div>
                    </div>
                </div>

                {!hideQ3 &&
                    <div id="Q3">
                        <div className="container">
                            <a href="#Q1" onClick={(e) => { setModal(false); props.click(e, "What can I say to a friend who's having unprotected sex?") }}>{isMobile ? (<>What can I say to a friend who's having unsafe sex?</>) : (<>What can I say to a friend who's having unprotected sex?</>)}</a><br />
                            <a href="#Q2" onClick={(e) => { setModal(false); props.click(e, "What is “sexual orientation”?") }}>What is “sexual orientation”?</a><br />
                            <a href="#Q2" onClick={(e) => { setModal(false); props.click(e, "What does transgender mean?") }}>What does transgender mean?</a><br />
                            <a href="#Q2" onClick={(e) => { setModal(false); props.click(e, "If someone of the same gender have sex, should they each have a condom on?") }}>{isMobile ? (<>Are two condoms necessary for same-sex relationships?</>) : (<>If someone of the same gender have sex, should they each have a condom on?</>)}</a><br />
                        </div>
                    </div>
                }

                <button className="close-modal" onClick={toggleModal}>
                    <span className="material-icons md-dark col-2">close</span>
                </button>
            </>
        )
    }

    if (isMobile) {
        return (
            <>
                <p className="pt-2 text-center animate-reveal animate-first">{props.cotopic.message.stringValue}</p>
                <p className="text-center animate-reveal animate-second" style={{ cursor: "pointer" }} onClick={() => { setModal(true) }}>Click here to see topics you might be interested</p>

                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content-co mobile modalloc">
                                <h6>Frequently Asked</h6>
                                {content()}
                                <button className="close-modal" onClick={toggleModal}>
                                    <span className="material-icons md-dark col-2">close</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    } else {
        return (
            <>
                <p className="pt-2 text-center animate-reveal animate-first">{props.cotopic.message.stringValue}</p>
                <p className="text-center animate-reveal animate-second" style={{ cursor: "pointer" }} onClick={() => { setModal(true) }}>Click here to see topics you might be interested</p>

                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content-co web">
                                <h5>&nbsp;Frequently Asked</h5>
                                {content()}
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ModalCOTopics;