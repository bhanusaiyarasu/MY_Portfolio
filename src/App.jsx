import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style.css'
import Layout from './components/Layout'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Experience from './pages/Experience'

function App() {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
            <div className={`app-main-wrapper ${splashDone ? 'app-revealed' : 'app-hidden'}`}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout splashDone={splashDone} />}>
                            <Route index element={<Home />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="experience" element={<Experience />} />
                            <Route path="skills" element={<Skills />} />
                            <Route path="about" element={<About />} />
                            <Route path="contacts" element={<Contacts />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
