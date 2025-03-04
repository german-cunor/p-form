import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './Start';
import Form from './Form';

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
        </Router>
    );
}

export default App;
