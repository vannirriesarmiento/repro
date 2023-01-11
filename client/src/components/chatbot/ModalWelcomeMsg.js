import React, { useState } from "react";
import '../App.css';

const ModalWelcomeMsg = () => {
   const [modal, setModal] = useState(true);
   const [endCarousel, setendCarousel] = useState(false);

   const toggleModal = (e) => {
      setModal(!modal);
      e.preventDefault();
      console.log(modal)
   };

   if (modal) {
      document.body.classList.add('active-modal')
   } else {
      document.body.classList.remove('active-modal')
   }

   return (
      <>
         {modal && (
            <>
               <div onClick={toggleModal} className="modaloverlay"></div>
               <div className="modalbox">
                  <div className="modal-content mobile">
                     <div id="myCarousel" className="carousel slide" style={{ paddingBottom: '10px', height: 'auto', top: '10px' }}>
                        <div className="carousel-inner">
                           <div className="active item" onTransitionEnd={() => { setendCarousel(false) }}>
                              <div className="container">
                                 <div className="text-center">
                                    <img src="assets/img/Repro1.png" width="150px" alt="" />
                                    <h5>Talk with Repro</h5>
                                    <p>Navigating by yourself can be complicating.<br />Chat with Repro about your health now!</p>
                                 </div>
                              </div>
                           </div>
                           <div className="item" onTransitionEnd={() => { setendCarousel(false) }}>
                              <div className="container">
                                 <div className="text-center">
                                    <img src="assets/img/Repro2.png" width="150px" alt="" />
                                    <h6>Access Reproductive Healthcare</h6>
                                    <p>From now on, you can access care remotely in your homes. No more excuses to fear your medical needs.</p>
                                 </div>
                              </div>
                           </div>
                           <div className="item" onTransitionEnd={() => { setendCarousel(false) }}>
                              <div className="container">
                                 <div className="text-center">
                                    <img src="assets/img/Repro4.png" width="150px" alt="" />
                                    <h6>Free &amp; Low Cost Health Service</h6>
                                    <p>Affiliated with Davao City Health Office's special program, Reproductive Health &amp; Wellness Center.
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="item" onTransitionEnd={() => { setendCarousel(false) }}>
                              <div className="container">
                                 <div className="text-center">
                                    <img src="assets/img/Repro3.png" width="150px" alt="" />
                                    <h5>Meet Healthcare Professionals</h5>
                                    <p>Get your health checked by a professional. We're here to help you be healthy &amp; strong!
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="item" onTransitionEnd={() => { setendCarousel(false) }}>
                              <div className="container">
                                 <h5 className="text-center">ABOUT REPRO</h5>
                                 <p className="text-center">Here's what you can do!</p>
                                 <div className="row">
                                    <div className="col">
                                       <p className="bmsg"><i class="bi bi-hospital"></i>&nbsp;&nbsp;Sexual & Reproductive Health (SRH)</p>
                                       <p className="pmsg">Repro aids people in their journey of SRH by offering medical help online.</p>
                                    </div>
                                    <div className="col">
                                       <p className="bmsg"><i class="bi bi-chat-quote"></i>&nbsp;&nbsp;Frequently Asked Questions</p>
                                       <p className="pmsg">A safe space is made to encourage users to be more open with their concerns.</p>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col">
                                       <p className="bmsg"><i class="bi bi-person-check"></i>&nbsp;&nbsp;User Profile (Syndrome & Demographic)</p>
                                       <p className="pmsg">Provides healthcare workers with real-time user profiles to understand patients better.</p>
                                    </div>
                                    <div className="col">
                                       <p className="bmsg"><i class="bi bi-file-medical"></i>&nbsp;&nbsp;Testing & Screening Recommendation</p>
                                       <p className="pmsg">The more you talk to Repro, the more it learns and the more it has to recommend.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="item" onTransitionEnd={() => { setendCarousel(true) }}>
                              <div className="container">
                                 <h5 className="text-center">VIDEO TUTORIAL</h5>
                                 <p className="text-center">Unsure how to use Repro? Watch video below!</p>
                                 <center><iframe width="auto" height="auto" src="https://www.youtube.com/embed/ocoWOXG-4fI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>
                              </div>
                           </div>
                        </div>
                        <ol className="carousel-indicators" style={{ position: 'relative', marginTop: '25px', marginBottom: '0px' }}>
                           <li data-target="#myCarousel" data-slide-to={0} className="active" />&nbsp;
                           <li data-target="#myCarousel" data-slide-to={1} onClick={() => { setendCarousel(false) }} />&nbsp;
                           <li data-target="#myCarousel" data-slide-to={2} onClick={() => { setendCarousel(false) }} />&nbsp;
                           <li data-target="#myCarousel" data-slide-to={3} onClick={() => { setendCarousel(false) }} />&nbsp;
                           <li data-target="#myCarousel" data-slide-to={4} onClick={() => { setendCarousel(false) }} />&nbsp;
                           <li data-target="#myCarousel" data-slide-to={5} onClick={() => { setendCarousel(true) }} />
                        </ol>
                     </div>
                     {!endCarousel ? (
                        <><a className="btn btn-block align-self-center" href="#myCarousel" data-slide="next">Next</a></>
                     ) : (
                        <><button className="btn btn-block align-self-center" href="/" data-slide="next" onClick={toggleModal}>Close</button></>
                     )}
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

export default ModalWelcomeMsg;