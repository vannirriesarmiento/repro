import React, { useState, useEffect } from "react";
import '../App.css';

const ModalDownload = (props) => {
    const [modal, setModal] = useState(false);

    const isMobile = window.innerWidth <= 1000;

    const toggleModal = (e) => {
        setModal(!modal);
        e.preventDefault();
    };

    const downloadFile = (content) => {
        const element = document.createElement('a');
        const blob = new Blob([content.current], { type: 'plain/text' });
        const fileUrl = URL.createObjectURL(blob);

        element.setAttribute('href', fileUrl);
        element.setAttribute('download', "repro-transcript.txt");
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        setTimeout(function () {
            setModal(true);
        }, 2000);
    }, []);

    useEffect(() => {
        var el = document.getElementById('download');

        if(el){
            el.addEventListener('click', function(e) {
                downloadFile(props.content);
            });
        }
    },[modal, props.content]);

    if (isMobile) {
        return (
            <>
                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content mobile modalloc">
                                <h6>Conversation Trancript</h6>
                                <p className="text-center">Here's a trancript of your conversation with Repro.</p>
                                <div className="btn align-self-center">
                                    <div className="valign-wrapper">
                                        <span className="material-icons md-dark mr-3">file_download</span>&nbsp;
                                        <a href="#download" id="download">DOWNLOAD</a>
                                    </div>
                                </div>
                                <p className="smallwarning pt-2">NOTE: Information above will not be saved, stored, copied, nor available unless downloaded by the user.</p>
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
                {modal && (
                    <>
                        <div onClick={toggleModal} className="modaloverlay"></div>
                        <div className="modalbox animate__bounceIn">
                            <div className="modal-content web">
                                <h4>Conversation Trancript</h4>
                                <p className="text-center">Here's a trancript of your conversation with Repro.</p>
                                <div className="btn align-self-center">
                                    <div className="valign-wrapper">
                                        <span className="material-icons md-dark mr-3">file_download</span>&nbsp;
                                        <a href="#download" id="download">DOWNLOAD</a>
                                    </div>
                                </div>
                                <p className="smallwarning pt-2">NOTE: Information above will not be saved, stored, copied, nor available unless downloaded by the user.</p>
                                <button className="close-modal" onClick={toggleModal}>
                                    <span className="material-icons md-dark col-2">close</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ModalDownload;