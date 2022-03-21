import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Record from './Record'
import Navbar from './Navbar'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/record" element={<Record />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing