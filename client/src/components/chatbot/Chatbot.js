import { v4 as uuid } from 'uuid';
import React, { useState, useEffect, useRef } from 'react';

import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

import '../App.css';
import Card from './Card';
import Link from './Link';
import Video from './Video';
import Swal from 'sweetalert2';
import Message from './Message';
import Cookies from 'universal-cookie';
import ModalMobile from './ModalWelcomeMsg';
import ModalDownload from './ModalDownload';
import reprologo from '../img/logo-icon.png';
import CuratedMessage from './CuratedMessage';
import Recommendation from './Recommendation';
import AccordionHandler from './AccordionHandler';
import BeatLoader from "react-spinners/BeatLoader";
import QuickRepliesHandler from './QuickRepliesHandler';
import ModalCOTopicsHandler from './ModalCOTopicsHandler';
import CarouselCardsHandler from './CarouselCardsHandler';
import Termsnconditionsmsg from './termsnconditionsmsg.js';

firebase.initializeApp({
    projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    private_key: JSON.parse(process.env.REACT_APP_FIREBASE_PRIVATE_KEY),
    client_email: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const Chatbot = () => {

    const inputRef = useRef(null);
    const content = useRef('');
    const messagesRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [cointents, setcointents] = useState([]);
    const [showBot, setShowbot] = useState(false);
    const [chatend, setchatend] = useState(false);
    const [Expandbot, setExpandbot] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [width, setwidth] = useState(window.innerWidth);
    const [inputdisable, setinputdisable] = useState(false);
    const [checkboxState, setCheckBoxState] = useState(false);
    const [botChatLoading, setBotChatLoading] = useState(true);
    const [countcointents, setcountcointents] = useState(false);
    const [termsnconditions, settermsnconditions] = useState(false);

    const isMobile = width <= 1000 && width != null;

    var contentt = "";
    var prevguidemsg = false;

    useEffect(() => {
        saveDB();
    })

    useEffect(() => {
        console.log('UUID:', cookies.get('userID'));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        handleMessagesScrollToBottom();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [messages, showBot, Expandbot]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            if (isMobile && termsnconditions) {
                window.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
            }
        }
    }, [messages, isMobile, termsnconditions]);

    if (Expandbot) {
        document.body.classList.add('active-chatbot-expand')
    } else {
        document.body.classList.remove('active-chatbot-expand')
    }

    const cookies = new Cookies();
    if (cookies.get('userID') === undefined) {
        cookies.set('userID', uuid(), { path: '/' });
    }

    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';

        cookies.remove('userID', uuid(), { path: '/' });
    });

    const handleWindowSizeChange = () => {
        setwidth(window.innerWidth);
    };

    const df_text_query = async (text, parameters) => {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        }
        if (messages[messages.length - 1].msg.payload && messages[messages.length - 1].msg.payload.fields && (messages[messages.length - 1].msg.payload.fields.quick_replies || messages[messages.length - 1].msg.payload.fields.quick_replies_typeable || messages[messages.length - 1].msg.payload.fields.guide)) {
            if (!prevguidemsg) {
                removeQuickReplies(messages, setMessages);
            } else {
                prevguidemsg = false;
            }
        }
        setMessages(prev => [...prev, says]);

        setBotChatLoading(true);
        setinputdisable(false);

        try {
            const body = { text, userID: cookies.get('userID'), parameters };
            const response = await fetch('/api/df_text_query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.fulfillmentMessages.length === 0) {
                if (data.intent && data.intent.displayName === 'Consultation') {
                    df_event_query('loaddb1');
                } else if (data.intent && data.intent.displayName === 'Address') {
                    df_event_query('loaddb2');
                } else {
                    fallbackresponse();
                }
            }

            data.fulfillmentMessages.forEach(async msg => {
                const says = {
                    speaks: 'bot',
                    msg: msg
                }
                await resolveAfterXSeconds(1.5)

                setBotChatLoading(false);
                setinputdisable(true);

                setMessages(prev => [...prev, says]);

                if (response.status === 200 && data) {

                    if (data.intent && data.intent.endInteraction === true) {
                        setinputdisable(false);
                        setchatend(true);

                        cookies.remove('userID', uuid(), { path: '/' });
                    }

                    if (data.intent && data.fulfillmentMessages.length === 0) {
                        if (data.intent.displayName === 'Consultation') {
                            df_event_query('loaddb1');
                        } else if (data.intent.displayName === 'Address') {
                            df_event_query('loaddb2');
                        }
                    }
                }
                if (msg.payload && msg.payload.fields) {
                    if (msg.payload.fields.quick_replies || msg.payload.fields.quick_replies_definition || msg.payload.fields.cards || msg.payload.fields.accordion) {
                        setinputdisable(false);
                    }
                }
            });

            if (response.status === 200) {
                if (data.intent && data.fulfillmentMessages.length === 0) {
                    if (data.intent.displayName === 'Consultation') {
                        df_event_query('loaddb1');
                    } else if (data.intent.displayName === 'Address') {
                        df_event_query('loaddb2');
                    }
                } else {
                    if (data.intent && (data.intent.displayName === 'Chat Only' || data.intent.displayName === 'What are remedies for dysmenorrhea? 2' || data.intent.displayName === 'Differentiate vaginal bleeding from period 2')) {
                        setcountcointents(true);
                    } else if (data.intent && (data.intent.endInteraction === true || data.intent.displayName === 'Consultation' || data.intent.displayName === 'Address')) {
                        setcountcointents(false);
                    }
                }

                if (countcointents) {
                    let intentname = data.intent.displayName;
                    if (!(intentname === 'Response to Questions' ||
                        intentname === 'Response to Questions - yes' ||
                        intentname === 'Response to Questions - no' ||
                        intentname === 'Negative Responses' ||
                        intentname === 'Goodbye 1' ||
                        intentname === 'Goodbye 2' ||
                        intentname === 'Fallback Intent' ||
                        intentname === 'Default Fallback Intent' ||
                        intentname === 'Chat Only - fallback' ||
                        intentname === 'Consultation' ||
                        intentname === 'Chat Only' ||
                        intentname.includes('Video Demo'))) {
                        if (intentname.includes('1')) {
                            intentname = intentname.replaceAll("1", "");
                        } else if (intentname.includes('2')) {
                            intentname = intentname.replaceAll("2", "");
                        }
                        setcointents(prev => [...prev, intentname]);
                    }
                }
            }
        } catch (error) {
            fallbackresponse();
        }
    }

    const df_event_query = async (event, parameters) => {
        try {
            setBotChatLoading(true);
            const body = { event, userID: cookies.get('userID'), parameters };
            const response = await fetch('/api/df_event_query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            data.fulfillmentMessages.forEach(async msg => {
                const says = {
                    speaks: 'bot',
                    msg: msg
                }
                await resolveAfterXSeconds(1);

                setMessages(prev => [...prev, says]);

                setBotChatLoading(false);
                setinputdisable(true);
            });
        } catch (error) {
            fallbackresponse();
        }
    }

    const fallbackresponse = () => {
        setBotChatLoading(false);
        setcountcointents(false);
        setchatend(true);

        const says = {
            speaks: 'bot',
            msg: {
                text: {
                    text: 'Sorry, there has technical difficulties. Please refresh page to restart.',
                }
            }
        }
        setMessages(prev => [...prev, says]);
        setTimeout(function () {
            setShowbot(false);
            setExpandbot(false);
        }, 3300)
    }

    const renderMessages = messages => {
        if (messages && messages.length > 0) {
            return messages.map((i, message) => {
                return renderMessage(i, message);
            });
        } else return null;
    }

    const renderMessage = (message, i) => {
        if (message) {
            return renderOneMessage(message, i);
        } else {
            return (null);
        }
    }

    const renderOneMessage = (message, i) => {
        if (message.msg && message.msg.text && message.msg.text.text) {
            createtranscript(message.speaks, message.msg.text.text)
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.card) {
            createtranscript("none", "[CARD: " + message.msg.payload.fields.card.structValue.fields.header.stringValue + "]")
            return (
                <div key={i}>
                    <Card key={i} payload={(message.msg.payload.fields.card.structValue)} />
                </div>
            )
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.recommendation) {
            createtranscript("none", "[CARD: Repro's Recommendation!]")
            return (
                <div key={i}>
                    <Recommendation key={i} payload={(message.msg.payload.fields.recommendation.structValue)} />
                </div>
            )
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return (
                <div key={i}>
                    <div className="scroll-box-horizontal">
                        <div style={{ width: message.msg.payload.fields.cards.listValue.values.length * 120 }}>
                            <CarouselCardsHandler key={i} payload={message.msg.payload.fields.cards.listValue.values} replyClick={handleCarouselCardsHandlerPayload} />
                        </div>
                    </div>
                </div>
            )
        }
        else if (message.msg && message.msg.payload && message.msg.payload.fields && (message.msg.payload.fields.quick_replies || message.msg.payload.fields.quick_replies_typeable || message.msg.payload.fields.quick_replies_definition)) {
            if (message.msg.payload.fields.quick_replies) {
                return <QuickRepliesHandler key={i} speaks={message.speaks} payload={message.msg.payload.fields.quick_replies.listValue.values} text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null} replyClick={handleQuickReplyPayload} />
            } else if (message.msg.payload.fields.quick_replies_typeable) {
                return <QuickRepliesHandler key={i} speaks={message.speaks} payload={message.msg.payload.fields.quick_replies_typeable.listValue.values} text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null} replyClick={handleQuickReplyPayload} />
            } else {
                return <QuickRepliesHandler key={i} speaks={message.speaks} payload={message.msg.payload.fields.quick_replies_definition.listValue.values} text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null} type="definition" replyClick={handleQuickReplyPayload} />
            }
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.richContent) {
            return <Link key={i} payload={(message.msg.payload.fields.richContent)} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.accordion) {
            createtranscript("none", "[ICR: " + message.msg.payload.fields.accordion.structValue.fields.name.stringValue + "]")
            return <AccordionHandler key={i} payload={(message.msg.payload.fields.accordion)} replyClick={handleAccordionPayload} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.curatedmsg) {
            createtranscript("none", "[CHAT ONLY RESPONSE]")
            return <CuratedMessage key={i} payload={(message.msg.payload.fields.curatedmsg)} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.video) {
            createtranscript("none", "[VIDEO]")
            return <Video key={i} payload={(message.msg.payload.fields.video.structValue.fields)} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.guide) {
            if (message.msg.payload.fields.guide.structValue.fields.type.stringValue === "modaltopic") {
                prevguidemsg = true;
                return <ModalCOTopicsHandler key={i} payload={(message.msg.payload.fields.guide.structValue.fields)} replyClick={handleModalCOPayload} />
            } else if (message.msg.payload.fields.guide.structValue.fields.type.stringValue === "problemarea") {
                return (
                    <div key={i}>
                        <p className="pt-2 text-center animate-reveal animate-first">{message.msg.payload.fields.guide.structValue.fields.message.stringValue}</p>
                        <p className="text-center animate-reveal animate-second" style={{ cursor: "pointer" }} onClick={(e) => { handleQuickReplyPayload(e, "", "Unsure") }}>Click here to see categories that may be useful for you</p>
                    </div>)
            } else {
                return (
                    <div key={i}>
                        <p className="pt-2 text-center animate-reveal animate-first">{message.msg.payload.fields.guide.structValue.fields.message.stringValue}</p>
                    </div>)
            }
        } else {
            fallbackresponse();
        }
    }

    const removeQuickReplies = (messages, setMessages) => {
        const allMessages = messages;
        messages.pop();
        setMessages(allMessages);
    };

    const handleQuickReplyPayload = (e, payload, text) => {
        e.preventDefault();
        e.stopPropagation();
        const copy = [...messages];
        copy.pop();
        setMessages(copy);
        df_text_query(text);
    }

    const handleCarouselCardsHandlerPayload = (e, text) => {
        e.preventDefault();
        e.stopPropagation();
        const copy = [...messages];
        copy.pop();
        setMessages(copy);
        df_text_query(text);
    }

    const handleAccordionPayload = (e, text) => {
        e.preventDefault();
        e.stopPropagation();
        df_text_query(text);
    }

    const handleModalCOPayload = (e, text) => {
        e.preventDefault();
        e.stopPropagation();
        df_text_query(text);
    }

    const resolveAfterXSeconds = (x) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x)
            }, x * 1000)
        })
    }

    const send = e => {
        e.preventDefault();

        if (textMessage) {
            df_text_query(textMessage);
        } else {
            df_text_query('👋');
        }

        setTextMessage('');
        e.target.value = '';
    };

    const handleMessagesScrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scroll({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    const doSignUp = () => {
        if (!checkboxState) {
            Swal.fire({
                icon: 'error',
                title: 'Error Detected!',
                text: 'Cannot proceed unless you agree to the Terms & Conditons.',
            })

        } else {
            settermsnconditions(true);
            df_event_query('Welcome');
        }
    }

    const displaymodal = (chatend) => {
        if (chatend) {
            return (<><ModalDownload content={(content)} /></>);
        }
    }

    const createtranscript = (speaker, speakermessage) => {

        if (speaker === "bot") {
            speaker = "Repro: ";
            speakermessage = speakermessage[0];
        } else if (speaker === "me") {
            speaker = "You: ";
        } else {
            speaker = "Repro: ";
        }

        var temp = speaker + speakermessage + "\n";
        contentt = contentt + temp;

        if (chatend) {
            content.current = contentt;
        }
    }

    const saveDB = () => {
        if (cointents.length > 0 && chatend) {
            db.collection("FAQs").doc("list-of-questions")
                .get().then((doc) => {
                    let faqslist = {};

                    const data = doc.data();

                    if (data) {
                        let temp = (cointents).concat(data.cointents);
                        faqslist = temp;
                    } else {
                        faqslist = cointents;
                    }
                    db.collection('FAQs').doc("list-of-questions").set({ "cointents": faqslist }, { merge: true });
                });

            setcointents([]);
        }
    }

    if (isMobile) {
        if (termsnconditions) {
            return (
                <>
                    {displaymodal(chatend)}
                    <div className='chatbot-mobile'>
                        <div className='chatbot-header-mobile'>
                            <div className="row" style={{ margin: 0 }}>
                                <div className='col-10 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>
                                    <div className="avatar avatar--small avatar--online">
                                        <img className="avatar__img" src={reprologo} alt="Repro" />
                                        <span className="avatar__status"></span>
                                    </div>
                                    <div className='chatbot-title'>REPRO</div>
                                </div>
                            </div>
                        </div>
                        <div id="chatbot" ref={messagesRef} className="chatbot-body-mobile">
                            {renderMessages(messages)}
                            {botChatLoading &&
                                (
                                    <div className='imessage'>
                                        <p className="from-them">
                                            <BeatLoader color="#9e9ea1" size={6} speedMultiplier={0.7} />
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        <div className='chatbot-input-mobile p-3'>
                            <form className='chatbot-input valign-wrapper' onSubmit={send}>
                                <input ref={inputRef} className='chatbot-input' disabled={!inputdisable ? true : false} value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder={!inputdisable ? '' : 'Type a message'} type="text" autoFocus />
                                {textMessage ? (
                                    <>
                                        <button className='chatbot-btn' disabled={!textMessage ? true : false} type='submit'><i className="material-icons">send</i></button>
                                    </>
                                ) : (
                                    <>
                                        <button className='chatbot-emojibtn' type='submit' disabled={!inputdisable ? true : false} onClick={send}>👋</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <ModalMobile />
                    <div className='chatbot-mobile'>
                        <div className='chatbot-header-mobile' onClick={() => setShowbot(false)} style={{ cursor: 'pointer' }}>
                            <div className="row" style={{ margin: 0 }}>
                                <div className='col-10 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>
                                    <div className='chatbot-title'>Terms of Use</div>
                                </div>
                            </div>
                        </div>
                        <div id="chatbot" ref={messagesRef} className="chatbot-body-mobile">
                            <Termsnconditionsmsg />
                            <br />
                        </div>
                        <div className='chatbot-input-mobile'>
                            <div className="row pt-2">
                                <div className='col-1'>
                                    <label className="valign-wrapper">
                                        <input type="checkbox" checked={checkboxState} onChange={(setCheckBoxState)} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className='col-11 valign-wrapper'>I read and agree to the&nbsp;<b>Terms &amp; Conditions</b>.</div>
                            </div>
                            <div className='col' style={{ paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', float: 'right' }}>
                                <button className="custom-btn btn-start" onClick={() => doSignUp()}>Get Started</button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    } else {
        if (showBot) {
            if (termsnconditions) {
                return (
                    <>

                        {displaymodal(chatend)}
                        <div className='chatbot'>
                            <div className='chatbot-header'>
                                <div className="row" style={{ margin: 0 }}>
                                    <div className='col-10 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>
                                        <div className="avatar avatar--small avatar--online">
                                            <img className="avatar__img" src={reprologo} alt="Repro" />
                                            <span className="avatar__status"></span>
                                        </div>
                                        <div className='chatbot-title'>REPRO</div>
                                    </div>
                                    <div className='col-2 valign-wrapper' style={{ paddingTop: '5px', paddingLeft: '3px', cursor: 'pointer' }}>
                                        <i className="small white-text material-icons" onClick={() => setShowbot(false)}>arrow_drop_down</i>
                                        <i className="small white-text material-icons" onClick={() => { setShowbot(false); setExpandbot(true); }}>arrow_drop_up</i>
                                    </div>
                                </div>
                            </div>
                            <div id="chatbot" ref={messagesRef} className="chatbot-body">
                                {renderMessages(messages)}
                                {botChatLoading &&
                                    (
                                        <div className='imessage'>
                                            <p className="from-them">
                                                <BeatLoader color="#9e9ea1" size={6} speedMultiplier={0.7} />
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='col-12' style={{ paddingLeft: '2%', paddingTop: '2%', paddingRight: '2%', borderTop: '1px solid #ddd' }}>
                                <form className='chatbot-input valign-wrapper' onSubmit={send}>
                                    <input ref={inputRef} className='chatbot-input' disabled={!inputdisable ? true : false} value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder={!inputdisable ? '' : 'Type a message'} type="text" autoFocus />
                                    {textMessage ? (
                                        <>
                                            <button className='chatbot-btn' disabled={!textMessage ? true : false} type='submit'><i className="material-icons">send</i></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='chatbot-emojibtn' type='submit' disabled={!inputdisable ? true : false} onClick={send}>👋</button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className='chatbot'>
                            <div className='chatbot-header' onClick={() => setShowbot(false)} style={{ cursor: 'pointer' }}>
                                <div className="row" style={{ margin: 0 }}>
                                    <div className='col-10 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>

                                        <div className='chatbot-title'>Terms of Use</div>
                                    </div>
                                    <div className='col-2 valign-wrapper' style={{ paddingTop: '5px', paddingLeft: '3px', cursor: 'pointer' }}>
                                        <i className="small white-text material-icons" onClick={() => setShowbot(false)}>arrow_drop_down</i>
                                        <i className="small white-text material-icons" onClick={() => { setShowbot(false); setExpandbot(true); }}>arrow_drop_up</i>
                                    </div>
                                </div>
                            </div>
                            <div id="chatbot" ref={messagesRef} className="chatbot-body">
                                <div className='scroll-box-vertical'>
                                    <Termsnconditionsmsg />
                                </div>
                                <br></br>
                                <div className="row" style={{ marginBottom: 0 }}>
                                    <div className='col-1' style={{ paddingLeft: '3px' }}>
                                        <label className="container">
                                            <input type="checkbox" checked={checkboxState} onChange={(setCheckBoxState)} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='col-11 valign-wrapper'>I read and agree to the&nbsp;<b>Terms &amp; Conditions</b>.</div>
                                </div>
                            </div>
                            <div className='col' style={{ paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', float: 'right' }}>
                                <button className="custom-btn btn-start" onClick={() => doSignUp()}>Get Started</button>
                            </div>
                        </div>
                    </>
                );
            }
        } if (Expandbot) {
            if (termsnconditions) {
                return (
                    <>

                        {displaymodal(chatend)}
                        <div className='overlay'></div>
                        <div className='chatbot-expand'>
                            <div className='chatbot-header'>
                                <div className="row" style={{ margin: 0 }}>
                                    <div className='col-11 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>
                                        <div className="avatar avatar--small avatar--online">
                                            <img className="avatar__img" src={reprologo} alt="Repro" />
                                            <span className="avatar__status"></span>
                                        </div>
                                        <div className='chatbot-title'>REPRO</div>
                                    </div>
                                    <div className='col-1 valign-wrapper' style={{ paddingTop: '5px', paddingLeft: '3px', cursor: 'pointer' }}>
                                        <i className="small white-text material-icons" onClick={() => { setShowbot(true); setExpandbot(false); }}>arrow_drop_down</i>
                                    </div>
                                </div>
                            </div>
                            <div id="chatbot" ref={messagesRef} className="chatbot-expand-body">
                                {renderMessages(messages)}
                                {botChatLoading && (
                                    <div className='imessage'>
                                        <p className="from-them">
                                            <BeatLoader color="#9e9ea1" size={6} speedMultiplier={0.7} />
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className='col-12' style={{ margin: 0, paddingLeft: '2%', paddingTop: '2%', paddingRight: '2%', borderTop: '1px solid #ddd' }}>
                                <form className='chatbot-input valign-wrapper' onSubmit={send}>
                                    <input ref={inputRef} className='chatbot-input' disabled={!inputdisable ? true : false} value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder={!inputdisable ? '' : 'Type a message'} type="text" autoFocus />
                                    {textMessage ? (
                                        <>
                                            <button className='chatbot-btn' disabled={!textMessage ? true : false} type='submit'><i className="material-icons">send</i></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='chatbot-emojibtn' type='submit' disabled={!inputdisable ? true : false} onClick={send}>👋</button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className='overlay'></div>
                        <div className='chatbot-expand'>
                            <div className='chatbot-header' onClick={() => setShowbot(false)} style={{ cursor: 'pointer' }}>
                                <div className="row" style={{ margin: 0 }}>
                                    <div className='col-11 valign-wrapper' style={{ paddingLeft: '0px', height: '40px' }}>
                                        <div className='chatbot-title'>Terms of Use</div>
                                    </div>
                                    <div className='col-1 valign-wrapper' style={{ paddingTop: '5px', paddingLeft: '3px', cursor: 'pointer' }}>
                                        <i className="small white-text material-icons" onClick={() => { setShowbot(true); setExpandbot(false) }}>arrow_drop_down</i>
                                    </div>
                                </div>
                            </div>
                            <div id="chatbot" ref={messagesRef} className="chatbot-expand-body">
                                <div className='scroll-box-vertical-expanded'>
                                    <Termsnconditionsmsg />
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className='col-1'>
                                        <label className="container">
                                            <input type="checkbox" checked={checkboxState} onChange={(setCheckBoxState)} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='col-11 valign-wrapper'>I read and agree to the&nbsp;<b>Terms &amp; Conditions</b>.</div>
                                </div>
                            </div>
                            <div className='col' style={{ paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', float: 'right' }}>
                                <button className="custom-btn btn-start" onClick={() => doSignUp()}>Get Started</button>
                            </div>
                        </div>
                    </>
                );
            }
        } else {
            return (
                <>
                    <div className='chatbot-container valign-wrapper'>
                        <div className='chatbot-message' data-aos="zoom-out-left" data-aos-delay="200">
                            Chat with me!
                        </div>
                        <div className='chatbot-bubble'>
                            <div className="avatar avatar--medium avatar--online" onClick={() => setShowbot(true)}>
                                <img className="avatar__img" src={reprologo} alt="Repro" />
                                <span className="avatar__status"></span>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default Chatbot;