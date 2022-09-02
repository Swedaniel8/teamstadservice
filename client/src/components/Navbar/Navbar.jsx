import React from 'react'
import { useNavigate } from 'react-router-dom'

import { FaHome } from 'react-icons/fa'
import { BiDownArrow } from 'react-icons/bi'
import { BsFillPersonFill, BsFillInfoCircleFill } from 'react-icons/bs'
import { MdContactSupport, MdOutlineHomeRepairService } from 'react-icons/md'
import { IoIosPeople } from 'react-icons/io'
import { FiSmile } from 'react-icons/fi'
import { AiOutlineArrowDown, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'

import Logo from '../Logo/Logo'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className='component__navbar'>

        <div className='navbar__fullscreen'> 
          <div className='navbar-section'><button onClick={() => navigate("/")}><FaHome id="react-icon"/>Hem</button></div>
          <div className='navbar-section'>
              <button><BiDownArrow className='navbar-icon'/>Service</button>
              <div className='navbar-submenu'>
                <button onClick={() => navigate("/serviceprivate")}><BsFillPersonFill id="react-icon"/>Privatpersoner</button>  
                <button onClick={() => navigate("/servicecompany")}><IoIosPeople id="react-icon"/>Företagsservice</button>  
              </div>
          </div>
          <div className='navbar-section'><button onClick={() => navigate("/about")}><BsFillInfoCircleFill style={{height:"17px"}} id="react-icon"/>Info</button></div>
          <div className='navbar-section'><button onClick={() => navigate("/career")}><MdOutlineHomeRepairService id="react-icon"/>Karriär</button></div>
          <div className='navbar-section'><button onClick={() => navigate("/contact")}><MdContactSupport id="react-icon"/>Kontakt</button></div>       
          <div className='navbar-hoverline'></div>
        </div>

        <div className='component__navbar-logo' onClick={() => navigate("/")}>
          <Logo />  
        </div>
        
        
        <div className='navbar__smallcreen component__dropdown_1'>
            <input className='dropdown1' type="checkbox" id="dropdown1Id"></input>
            <label className='for-dropdown1' htmlFor="dropdown1Id">Meny<AiOutlineArrowDown className='AiOutlineArrowDown' /></label>
            <div className='dropdown1__section'>
                <button onClick={() => navigate("/")}>Hem<AiOutlineArrowRight /></button>
                <input className='dropdown1-sub' type="checkbox" id="dropdown1Id-sub"></input>
                <label className='for-dropdown1-sub' htmlFor="dropdown1Id-sub">Service<AiOutlinePlus className="AiOutlinePlus"/></label>
                <div className='section-dropdown1-sub'>
                    <button onClick={() => navigate("/serviceprivate")}>Privat <AiOutlineArrowRight /></button>
                    <button onClick={() => navigate("/servicecompany")}>Företag <AiOutlineArrowRight /></button>
                </div>
                <button onClick={() => navigate("/about")}>Om Oss <AiOutlineArrowRight /></button>
                <button onClick={() => navigate("/career")}>Karriär <AiOutlineArrowRight /></button>
                <button onClick={() => navigate("/contact")}>Kontakt <AiOutlineArrowRight /></button>
            </div>
        </div>
        
        

    </div>
  )
}

export default Navbar