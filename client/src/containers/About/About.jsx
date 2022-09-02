import React, {useCallback,useEffect,useRef,useState} from 'react'
import { GoogleMap, useJsApiLoader, Polygon, LoadScript } from '@react-google-maps/api';

import { mapData } from '../../constants/data/gadm41_SWE_1';
import { Map } from '../../components/index';
import './About.css'

const About = () => {

  return (
    <div className='container__about bg flex__center'>

      <div className='about__map' id="map">
        <h1 className='title__main'>Områden vi arbetar i</h1>
        <div className='title__line' style={{width:"275px"}}></div>

        <div className='about__map-rowSection'>

          <ul>
            <p className='p__main'>Vilka områden vi arbetar runt</p>
            <div className='title__line' style={{width:"245px"}}></div>
            <li className='p__main'>Göteborg</li>
            <li className='p__main'>Kungälv</li>
            <li className='p__main'>Lilla Edet</li>
            <li className='p__main'>Lödöse</li>
            <li className='p__main'>Nygård</li>
          </ul>

          <div className='googleMap-fullscreenMap'>
            <Map classname='fullscreenMap' containerStyle={{width:'500px',height:'500px'}} zoom={9} />
          </div>

          <div className='googleMap-smallscreenMap'>
            <Map classname='smallscreenMap' containerStyle={{width:'250px',height:'250px'}} zoom={9} />
          </div>

        </div>

      </div>

      <div className='about__info'>

        <h1 className='about__title title__main'>Vi är Städservice</h1>
        <div className='title__line' style={{width:"225px"}}></div>
        <p className='p__main'>Vi arbetar med rut avdrag och du betalar 50% av den egentliga kostnaden. Du får använda rut avdraget med upp till 25.000 kronor per år. Det tycker vi är en fantastisk lösning som passar många av dagens hushåll och varierade familjeförhållanden.</p><br></br>
        <p className='p__main'>Team Städservice AB startades som handelsbolag 1987 och ombildades ett år senare till aktiebolag.</p>
        <p className='p__main'>Under 2003 startades även en avdelning för trädgårdsservice respektive praktisk fastighetsservice, TEAM Naturmontage och TEAM Fastighetsservice.
Idag omsätter vi cirka 10 miljoner svenska kronor och har cirka 30 anställda.</p>
        <p className='p__main'>Vi är ett medlemsföretag i Svenskt Näringsliv samt Byggföretagen.</p>
            

        <h3 className='title__main'>Miljö</h3>
        <div className='title__line' style={{width:"40px"}}></div>
        <p className='p__main'>Vi arbetar kontinuerligt med att förbättra vårt arbete inom alla berörda områden så som lägre energiförbrukning, avfallshantering samt minskad vatten- och kemikalie användning. För att minska vår inverkan på miljön. Alla produkter vi använder oss av är miljöklassade. Vår personal är utbildad i Ecodrivning- en körteknik som ger 10-20% lägre bränsleförbrukning.</p>

        <h3 className='title__main'>Arbetsmiljö</h3>
        <div className='title__line' style={{width:"95px"}}></div>
        <p className='p__main'>Vi har kollektivavtal, ansvarsförsäkring teknad i Länsförsäkringar med försäkringsnummer 414534*09. Erbjuder våra medarbetare friskvårdsbidrag samt utbildar de i ergonomi och miljöanpassat arbete.</p>

        </div>
    </div>
  )
}

export default About