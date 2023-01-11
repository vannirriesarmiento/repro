import './App.css';
//import './App.html';
import React from 'react';
import Chatbot from './chatbot/Chatbot';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

const App = () => {
    return <div>
        <BrowserRouter>
        </BrowserRouter>
        <Chatbot/>
    </div>
}

export default App;

