import React, { useState } from "react";
import locationimage from "../img/locationmap.jpg";
import '../App.css';

const ModalLocation = () => {
   const [modal, setModal] = useState(false);

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

   if (isMobile) {
      return (
         <>

            <div className="valign-wrapper">
               <span className="material-icons md-dark mr-3">location_on</span>&nbsp;
               <a href="/" onClick={toggleModal}>LOCATION</a>
            </div>

            {modal && (
               <>
                  <div onClick={toggleModal} className="modaloverlay"></div>
                  <div className="modalbox animate__bounceIn">
                     <div className="modal-content mobile modalloc">
                        <img src={locationimage} alt="RHWC Clinic Location" style={{ width: '75%' }} />
                        <button className="close-modal" onClick={toggleModal}>
                           <i className="material-icons col-2">close</i>
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
            <div className="valign-wrapper">
               <span className="material-icons md-dark">location_on</span>&nbsp;&nbsp;
               <a href="/" onClick={toggleModal}>LOCATION</a>
            </div>

            {modal && (
               <>
                  <div onClick={toggleModal} className="modaloverlay"></div>
                  <div className="modalbox animate__bounceIn">
                     <div className="modal-content web">
                        <img src={locationimage} alt="RHWC Clinic Location" className="modal-img" />
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

export default ModalLocation;