import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Navbar, Footer } from './components/index'
import { Header, About, Career, Contact, ServicePrivate, ServiceCompany } from './containers/index'

import './App.css';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Header />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/serviceprivate' element={<ServicePrivate />} />
        <Route path='/servicecompany' element={<ServiceCompany />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App



