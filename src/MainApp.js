import React from 'react';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App1 from './App1';
import App2 from './App2'

function MainApp() {
    return(
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<App1 />}/>
                    <Route path='/accueil' element={<App />}/>
                    <Route path='/inscription' element={<App2 />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default MainApp;