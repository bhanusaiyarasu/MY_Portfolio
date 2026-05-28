import React, { useState } from 'react'
import './styles/globals.css'
import { useLenis } from './hooks/useLenis'

// Components
import CustomCursor from './components/cursor/CustomCursor'
import Preloader from './components/sections/Preloader'
import Navbar from './components/nav/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Stats from './components/sections/Stats'
import Contact from './components/sections/Contact'
import Footer from './components/footer/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)
  
  // Initialize Lenis smooth scroll on desktop
  useLenis()

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      
      <div className="app-main">
        <Navbar />
        <main>
          <Hero loaded={loaded} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
