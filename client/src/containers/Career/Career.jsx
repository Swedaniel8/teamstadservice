import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import FileBase from 'react-file-base64'

// REDUCERS
import { careerPosts } from '../../slices/apiReducer'

import { images } from '../../constants/images'
import './Career.css'


const Career = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const dispatch = useDispatch()
    const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ formData, setFormData ] = useState({
        firstname:"",
        lastname:"",
        email:"",
        number:"",
        occupation:"",
        license:"Ja",
        startDate:"",        
        other:"",
        token:""
    })
    const [ selectedFile, setSelectedFile ] = useState(null)

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
        sendData["selectedFile"] = selectedFile
        console.log("sendData: ",sendData)

        dispatch(careerPosts(sendData))
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
                    occupation:"",
                    license:"Ja",
                    startDate:"",        
                    other:"",
                    token:""
                })
            })
    }
  return (
    <div className='container__career bg flex__center'>

        <div className='career__section'>
            
            <div className='career__section-form'>
                <div className='career__section-info'>
                    <h1>Karriär</h1>
                    <div className='title__line'></div>                
                    <p>Vi söker kontinuerligt duktiga medarbetare. Skicka gärna in ditt CV tillsammans med en kort presentation av dig själv till oss</p>
                </div>

                <div className='career__section-input'>
                    <form>

                        <div className='career__section-input-name'>
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
                        
                        <label htmlFor="fnumber">Telefonnummer*</label>
                        <input type="tel" id="fnumber" onChange={handleChange} value={formData.number} name="number" style={{width:"150px"}} required></input>

                        <label htmlFor="currentWork">Nuvarande sysselsättning*</label>
                        <select id="currentWork" onChange={handleChange} value={formData.occupation} name="occupation" required>
                            <option value="default">Välj sysselsättning</option>
                            <option value="Arbetar, tillsvidareanställning">Arbetar, tillsvidareanställning</option>
                            <option value="Arbetar, tillfällig anställning">Arbetar, tillfällig anställning</option>
                            <option value="Studerar">Studerar</option>
                            <option value="Arbetslös">Arbetslös</option>
                            <option value="Annat">Annat</option>
                        </select>

                        <p style={{marginTop:"0.5rem"}}>Har du B-kört*</p>
                        <div className='career__section-input-licens'>
                            <input type="radio" id="careercheckbox1" onChange={handleChange} value="Ja" name="license" defaultChecked/>
                            <label htmlFor='careercheckbox1'>Ja</label>
                            
                            <input type="radio" id="careercheckbox2" onChange={handleChange} value="Nej" name="license"/>
                            <label htmlFor='careercheckbox2'>Nej</label>                          
                        </div>
                        
                          

                        <label htmlFor="fdate" required>När kan du börja*</label>
                        <input type="date" id="fdate" onChange={handleChange} value={formData.startDate} name="startDate" required></input>

                        <label htmlFor="fcv" required>Ladda upp CV (.pdf)*</label>
                        <FileBase 
                            type="file"
                            accept='.pdf' 
                            id="fcv" 
                            multiple={false}                       
                            onDone={(base64) => setSelectedFile(base64) }
                            name="cv"
                            required
                            >
                        </FileBase>


                        <label htmlFor="fother">Övrig Information</label>
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

            <div className='career__section__image'>
                <img src={images.teamstad4} alt='women cleaning'/>
            </div>

        </div>

        
        
    </div>
  )
}

export default Career