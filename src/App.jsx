import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import About from './pages/About'
import Contacts from './pages/Contacts'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="about" element={<About />} />
                    <Route path="contacts" element={<Contacts />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
