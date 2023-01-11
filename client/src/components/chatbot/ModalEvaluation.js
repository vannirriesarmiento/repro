import React, { useState, useEffect } from "react";
import '../App.css';

const ModalEvaluation = () => {
    const [modal, setModal] = useState(false);

    const isMobile = window.innerWidth <= 1000;

    const toggleModal = (e) => {
        setModal(false);
        e.preventDefault();
        console.log(modal)
    };

    if (modal) {
       document.body.classList.add('active-modal')
    } else {
       document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        setTimeout(function () {
            setModal(true);
        }, 5000);
    }, []);

    if (isMobile) {
        return (
            <>
                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content mobile modaleval">
                                <h5>Thank you for using Repro!</h5>
                                <p className="text-justify">
                                    We would very much appreciate it if you would please take a few minutes of your time and share your experience on the review form linked below.
                                </p>
                                <a className="btn align-self-center" href="https://forms.gle/MFoVLJssXF5JjT2G8" target="_blank" rel="noreferrer" ><span className="material-icons md-dark align-middle">link</span>&nbsp;Google Forms</a>
                                <button className="close-modal" onClick={toggleModal}>
                                    <span className="material-icons col-2">close</span>
                                </button>
                            </div>
                        </div></>
                )}
            </>
        );
    } else {
        //kani
        return (
            <>
                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content web">
                                <h5>Thank you for using Repro!</h5>
                                <p className="text-justify">
                                    We would very much appreciate it if you would please take a few minutes of your time and share your experience on the review form below.
                                </p>
                                <div className="scroll-box2">
                                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScUUi58H558UBSNAnd-RsA8LlxTujWC3Ba2jEo81K8K1ReaaQ/viewform?embedded=true" title="Telehealth Usability Questionnaire" width="480" height="9000" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no">Loading…</iframe>
                                </div>
                                <button className="close-modal" onClick={toggleModal}>
                                    <span className="material-icons col-2">close</span>
                                </button>
                            </div>
                        </div></>
                )}
            </>
        );
    }
}

export default ModalEvaluation;