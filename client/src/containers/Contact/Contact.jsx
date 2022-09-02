import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


// REDUCERS
import { contactPosts } from '../../slices/apiReducer'

import { images } from '../../constants/images'

import './Contact.css'

const Contact = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const dispatch = useDispatch()
    const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ formData, setFormData ] = useState({
        firstname:"",
        lastname:"",
        email:"",
        number:"",        
        other:"",
        token:""
    })


    /*-----------------------RECAPTCH VERIFY-------------------*/
    const handleReCaptchaVerify = useCallback(async () => {
        if(!executeRecaptcha){
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha('login_page');
        setTokenState(token)
    },[executeRecaptcha])
    useEffect(() => {
        handleReCaptchaVerify();
      }, [handleReCaptchaVerify]);
    /*-----------------------RECAPTCH VERIFY-------------------*/




    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        
    }
    const submit = (e) => {
        e.preventDefault()
        
        var sendData = formData
        sendData["token"] = tokenState
        console.log("sendData: ",sendData)
        setErrorMessage("")
        dispatch(contactPosts(sendData))
            .then(unwrapResult)
            .then(res => {
                console.log("response careerPosts: ",res)
                if(res.success && !res.err){
                    setErrorMessage("Tack så mycket för ditt mail, vi kommer svara dig så fort vi kan!")
                }else{
                    setErrorMessage(<><p style={{color:"red"}}>Ursäkta men något gick fel, försök igen.</p><p style={{color:"red"}}>Ibland hjälper det att updater sidan</p></>)
                }
                setFormData({
                    firstname:"",
                    lastname:"",
                    email:"",
                    number:"",        
                    other:"",
                    token:""
                })
            })
    }

  return (
    <div className='container__contact bg flex__center'>

        <div className='contact__section'>
            
            <div className='contact__section-form'>
                <div className='contact__section-info'>
                    <h1>Kontakt</h1>
                    <div className='title__line' style={{width:"105px"}}></div>                
                    <p>Har du några övriga frågor tveka inte att skicka ett mail från formuläret nedan eller ring oss på vårat telefonnummer: 0709 – 40 21 95</p>
                </div>

                <div className='contact__section-input'>
                    <form>
                        <div className='contact__section-input-name'>
                            <div>
                                <label htmlFor="fname1">Förnamn*</label>
                                <input type="text" id="fname1" onChange={handleChange} value={formData.firstname} name="firstname" required></input>
                            </div>
                            <div>
                                <label htmlFor="fname2">Efternamn*</label>
                                <input type="text" id="fname2" onChange={handleChange} value={formData.lastname} name="lastname" required></input>
                            </div>
                        </div>

                        <label htmlFor="fmail">Email*</label>
                        <input type="email" id="fmail" onChange={handleChange} value={formData.email} name="email" required></input>

                        <label htmlFor="fnumber">Telefonnummer</label>
                        <input type="tel" id="fnumber" onChange={handleChange} value={formData.number} name="number" style={{width:"150px"}}></input>                     


                        <label htmlFor="fother">Meddelande</label>
                        <textarea id="fother" onChange={handleChange} value={formData.other} name="other" maxLength="800"></textarea>
                        
                        <div className='component__button_4'>
                            <button onClick={submit}><span>Skicka</span></button>
                        </div>
                    </form>
                </div>
                <div className='contact__section-form-message'>
                    {errorMessage}
                </div>
            </div>
            
            
            <div className='contact__section__image'>
                <div className='contact__info'>
                    <h2>Kontaktuppgifter</h2>
                    <div className='title__line' style={{width:"170px"}}></div> 
                    <p>Huvudkontor</p>
                    <p>Danska backen 5</p>
                    <p>463 71 Lödöse</p>
                    <p>Lilla Edets kommun</p>
                    <p>office@teamstadservice.se</p>
                    <p>0709 – 40 21 95</p>
                </div>
                <img src={images.teamstadContact} alt='women cleaning'/>
            </div>

        </div>

    </div>
  )
}

export default Contact