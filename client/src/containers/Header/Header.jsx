import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { TbHome, TbArrowBigUpLines } from 'react-icons/tb'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiOutlineOfficeBuilding, HiSparkles } from 'react-icons/hi'
import { ReactComponent as Cleaningicon } from '../../assets/cleaningicon.svg'
import { ReactComponent as Housekeepericon } from '../../assets/housekeepericon.svg'
import { ReactComponent as Vacuumicon } from '../../assets/vacuumicon.svg'
import { ReactComponent as Wipinglineicon } from '../../assets/wipinglineicon.svg'
import { ReactComponent as Binderfileicon } from '../../assets/binderfileicon.svg'
import { ReactComponent as Carpetmattressrugicon } from '../../assets/carpetmattressrugicon.svg'
import { ReactComponent as Factorypollutionicon } from '../../assets/factorypollutionicon.svg'
import { ReactComponent as Fruitbasketicon } from '../../assets/fruitbasketicon.svg'
import { ReactComponent as Stairupicon } from '../../assets/stairupicon.svg'



import './Header.css'

const Header = () => {
  const [ choice, setChoice ] = useState("test")
  const navigate = useNavigate()
  const [ sectionBool, setSectionBool ] = useState(true)
  return (
    <div className='container__header bg flex__center'>      

      <div className='header__intro'>
        <h1 className='title__main'>Kvalitetsstäd i Göteborg</h1>
        <div className='title__line' style={{width:"320px"}}></div>
        <h4 className='title__main'>Professionell städservice sedan 1987</h4>
        <p className='p__main'>Team Städservice erbjuder en komplett lokalvårdslösning till dig som kund oavsett om du har en butikslokal, industrilokal, kontorslokal eller behöver hjälp med hemstädning i Göteborg med omnejd.</p>
        <p className='p__main'>All vår personal är utbildad och anslutna till Fastighetsanställdas förbund. Alla är också ansvarsförsäkrade hos Länsförsäkringar med försäkringsnummer 414534*09.</p>
        <h3 className='title__main' style={{marginTop:"2rem"}}>Varför Team Städservice?</h3>
        <div className='title__line' style={{width:"200px"}}></div>
        <div className='header__intro-checklist'>
          <p>Vi skräddarsyr utförandet efter dina önskemål.</p>
          <p><AiOutlineCheck id='react__icon'/>Allt städmaterial är inkluderat.</p>
          <p><AiOutlineCheck id='react__icon'/>Ingen framkörningsavgift.</p>
          <p><AiOutlineCheck id='react__icon'/>50% rut avdrag, upp till 25.000 SEK .</p>
          <p><AiOutlineCheck id='react__icon'/>Ingen bindningstid.</p>
          <p><AiOutlineCheck id='react__icon'/>Vi har kollektivavtal.</p>
        </div>
      </div>

      
        <div className='header__info flex__center'>
          <div className='header__info-buttons' onChange={()=> setSectionBool(!sectionBool)}>
            <input type="radio" id="headercheckbox1" name="headercheckbox" defaultChecked/>
            <label htmlFor='headercheckbox1'>Privat</label>
            
            <input type="radio" id="headercheckbox2" name="headercheckbox"/>
            <label htmlFor='headercheckbox2'>Företag</label>           
            
          </div>
          <h2 className='title__main'>Vad vi erbjuder dig</h2>
          <div className='title__line'></div>

          {/* PRIVATE OR COMPANY OPTIONS ARE SHOWN */}
          {sectionBool? 
          // PRIVATE
          <div className='header__info-sections-services'>
            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/serviceprivate", { state:"Hemstäd"})}>
                <TbHome id='react__icon'/>
                <h4>Hemstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/serviceprivate", { state:"Flyttstäd"})}>
                <MdOutlineCleaningServices id='react__icon'/>
                <h4>Flyttstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/serviceprivate", { state:"Storstäd"})}>
                <TbArrowBigUpLines id='react__icon'/>
                <h4>Storstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/serviceprivate", { state:"Fönsterputs"})}>
                <HiSparkles id='react__icon'/>
                <h4>Fönsterputsning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/serviceprivate", { state:"Mattvätt"})}>
                <Carpetmattressrugicon id='react__icon-svg'/>
                <h4>Mattvätt</h4>
              </div>
              
            </div>
          </div>
          : // COMPANY 
          <div className='header__info-sections-services'>
            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Butiksstädning"})}>
                <Cleaningicon id='react__icon-svg'/>
                <h4>Butiksstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Byggstädning"})}>
                <Vacuumicon id='react__icon-svg'/>
                <h4>Byggstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Industristädning"})}>
                <Factorypollutionicon id='react__icon-svg'/>
                <h4>Industristädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Kontorsstädning"})}>
                <Wipinglineicon id='react__icon-svg'/>
                <h4>Kontorsstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Trappstädning"})}>
                <Stairupicon id='react__icon-svg'/>
                <h4>Trappstädning</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Vaktmästeri_Fastighetsservice"})}>
                <Housekeepericon id='react__icon-svg'/>
                <h4>Vaktmästeri/</h4>
                <h4>Fastighetsservice</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Entrémattor"})}>
                <Carpetmattressrugicon id='react__icon-svg'/>
                <h4>Entrémattor</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Kontorsmaterial_Förbrukningsmaterial"})}>
                <Binderfileicon id='react__icon-svg'/>
                <h4>Förbrukningsmaterial/</h4>
                <h4>Kontorsmaterial</h4>
              </div>
              
            </div>

            <div className='header__info-section flex__center'>
              <div className='header__info-section-icon flex__center' onClick={()=>navigate("/servicecompany", { state:"Fruktkorg"})}>
                <Fruitbasketicon id='react__icon-svg'/>
                <h4>Fruktkorg</h4>
              </div>
              
            </div>

          </div>
        
        
        }
      </div>
    </div>
  )
}

export default Header