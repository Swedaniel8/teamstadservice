import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../Logo/Logo'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='component__footer flex__center'>      

    <div className='component__footer-content flex__center'>

      <div className='component__footer-logo' onClick={() => {navigate("/");window.scrollTo(0, 0);}}>
        <Logo />
      </div>
      
      <div className='component__footer-info'>
        <h2>Kontakt</h2>
        <p>Huvudkontor</p>
        <p>Danska backen 5</p>
        <p>463 71 Lödöse</p>
        <p>Lilla Edets kommun</p>
        <p>office@teamstadservice.se</p>
        <p>0709 – 40 21 95</p>
      </div>

    </div>

    <div className='component__footer-copyright'>
      <p className='p__main'>© 2022 SweDesign AB. All Rights Reserved.</p>
    </div>
    <div id="recaptcha" style={{position:"absolute",bottom:"0",right:"0"}}></div>
    </div>
  )
}

export default Footer