import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useLocation } from 'react-router-dom';

import { servicePosts } from '../../slices/apiReducer'

import { images } from '../../constants/images'
import './ServicePrivate.css'
const ServicePrivate = () => {
    const location = useLocation();
    
    //! KONSTIGA SAKER I TESTERNA!
    //TODO VÄLDIGT OFTA STÅR DET I tex partille, lilla edet, göta osv... varför inte bara göteborgs området,västra götaland? Detta skappar förvirring
    const jobArr = ["Hemstäd","Flyttstäd","Storstäd","Fönsterputs","Mattvätt","Annat"]
    const [ typeOfCleaning, setTypeOfCleaning ] = useState({
        Default: [
            <>
            <h2>Privatstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- vi har alla lösningar för dina behov!</h3><br></br>
            <p>Vilken tjänst är du intresserad utav? </p><br></br>
            <ul style={{marginLeft:"1.5rem"}}>
                {jobArr.map((item,index)=>
                    <li key={index} style={{marginBottom:"0.5rem"}}>{item}</li>
                )}
            </ul>
            </>
           
        ],
        Hemstäd: [
            <>
            <h2>Hemstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>– hemstädning för ett hem som känns skönare att koppla av i</h3><br></br>
            <p>Vi erbjuder er hemstädning för att få en vardag där man hinner med allt man tycker om att göra. Det är en självklarhet för de flesta utav oss. Vi har samtidigt mycket annat vi måste få ihop, som matlagning, storhandling och hemstädning. Man önskar att ha mer tid över för andra saker, men det är skönt att få hemmet skinande rent.</p><br></br>
            <h3>Vad ingår i hemservice?</h3>
            <p>Vi kommer tillsammans överens om vad som ska ingå i städningen hemma hos dig. Ibland kanske du bara vill hjälp med dammsugning medans nästkommande vecka önska en mer omfattande hemstädning med allt från tvätt till rengöring av ugn och vitvaror. Helt enkelt så har vi alltid en lösning för just dig.</p><br></br>
            <p>Är du pensionär och har svårt att flytta ut tunga möbler för att städa under dem? Vi hjälper dig med det och vi anpassar oss alltid till dina önskemål och dig som individ.</p><br></br>
            <h3>Så hur ordnar vi hemstädning på bästa sätt?</h3><br></br>
            <p>Jo, vi på Team städservice är flexibla, är du ensamstående och du har barnen varannan vecka? Kanske jobbar du över de veckor du är ensam för att veckan därpå kunna vara flexibel när du har dina barn? Många gånger kanske städningen är det som blir bortprioriterat och det förstår vi, därför anpassar vi vår hemstädning efter dina behov.</p>
            <h3>Vi besöker dig i hemmet och arbetar med tydliga säkerhetsrutiner</h3><br></br>
            <p>Du ska känna dig trygg med oss. All vår personal som besöker dig för hemstädning är noggrant utvalda för just denna typen av tjänst och har många års erfarenhet av hemstädning. vi anpassar oss gentemot dig som kund och är alltid serviceinriktade i vårt bemötande.</p><br></br>
            <p>Hur ofta du som kund vill att vi besöker dig varierar och beror självklart på vad just du behöver hjälp med. Många av våra kunder bokar oss veckovis medans andra besöker vi var fjärde vecka. Några kunder väljer till exempel att boka oss vid enstaka tillfällen per år.</p><br></br>
            <p>Med vår långa erfarenhet och med den yrkesstolthet vi arbetar med, kan du känna dig trygg när du bokar hemstädning av oss.</p><br></br>
            <p>Vi är säkra på att du blir nöjd och kommer fortsätta att använda hushållsnära tjänster från oss på Team städservice!</p><br></br>
            <p>Kontakta oss gärna för ytterligare information om priser kring hemstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br>

            </>
        ],
        Flyttstäd: [
            <>
            <h2>Flyttstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- för ett smidigare byte av ditt boende</h3><br></br>
            <p>Att flytta städa är aldrig kul, noggrannhet som krävs är tids- och energikrävande. Därför finns vi, Team Städservice.</p><br></br>
            <h3>Vi har alla flyttat någon gång i livet och fått känna på hur omfattande flyttstädning kan vara.</h3><br></br>
            
            <p>Ibland tar det lång tid att färdigställa en flyttstädning och det kanske är svårt att hinna klart i tid. Vårt mål är att göra din flytt lite enklare. Låt oss ta hand om kyl och frys, eller ugnen. Fläkten i badrummet, när rengjordes den egentligen? Ingenting är omöjligt för oss när vi flyttstädar ditt boende!</p><br></br>
            <p>Vi färdigställer din gamla lägenhet, innan nästa person flyttar in. Flyttstädningen ska göra att den som kommer flytta in i sitt nya hem upplever det rent och fräscht utan spår från en gammal hyresgäst. Det är viktigt att bostaden ska kännas grundligt och noggrant städad för att den ska kunna godkännas. Städningen kommer hjälpa dig att få en sak mindre att tänka på.</p><br></br>
            <h3>Vi går alltid efter en checklista för flyttstädning när vi är ute och utför alla våra städ med stort engagemang.</h3><br></br>
            <p>Eftersom vårt primära mål är att du ska känna dig trygg när du bokar städ med oss håller vi en god kommunikation och du är välkommen att kontakta oss för eventuella frågor.</p><br></br>

            <p>Kontakta oss för ytterligare information om priser kring flyttstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p>
            </>
        ],
        Storstäd: [
            <>
            <h2>Storstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- för en skinande miljö enligt Era önskemål</h3><br></br>
            <p>Hur många av oss kommer egentligen ihåg att städa från golv till tak mer än en gång i månaden, eller knappt det? Det är nog inte heller så många som dammsuger och våttorkar golv och väggar flera gånger i månaden.</p><br></br>
            <p>Det vanligaste är att vi i vardagen prioriterar utrymmen som kök och badrum, för att sedan glömma bort de där envisa listerna som samlar otaliga mängder damm och ugnen som borde blivit skurad redan förra månaden. Vi gör allt det där för dig och mycket mer!</p><br></br>
            <h3>Vad erbjuder vi med storstädning.</h3><br></br>            
            <p>Allt och med extra noggrannhet. Inget är för stort eller för litet för oss. Vi rensar golvbrunnar, torkar ur skåp, rengör och dammar mattor, rensar ur vattenlås och rengör listerna.</p><br></br>            
            <p>Köket brukar är en mötesplatsen för hela familjen och det är en speciell känsla när man kliver in och få mötas av blänkande handtag och en gnistrande diskho när man ska förbereda middagen. Det är verkligen en speciell känsla! Allt detta och mycket mer får du uppleva när vi varit på besök hos er!</p><br></br>
            <p>Har ni särskilda önskemål om att få ugnen skurad? Eller skulle kylen behöva rengöras och frysen kanske frostas av? Meddela oss bara om era särskilda önskemål, så utför vi de åt er! Vi vet att ingen storstädning är den andra lik, därför gör vi städningen efter era önskemål.</p><br></br>
            <p>Med vår långa erfarenhet och med den yrkesstolthet vi har, kan ni känna er trygga när ni bokar oss för att utföra storstädning.</p><br></br>
            <p>Kontakta oss för ytterligare information om priser kring storstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p>
            </>
        ],
        Fönsterputs: [
            <>
            <h2>Fönsterputsning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- för rena och skinande fönster på nolltid</h3><br></br>
            <p>Att ha skinande rena och blanka fönster hemma är en vardagslyx man sällan glömmer av. Det är en speciell känsla när fönstren blänker, fria från stänk och smuts.</p><br></br>
            <h3>Vi hjälper dig med fönsterputsning</h3><br></br>
            <p>Vi på Team städservice hjälper dig att putsa och rengöra dina fönster, oavsett vilket antal fönster det handlar om. För oss är det en självklarhet att hjälpa dig få dina fönster skinande rena! Vi arbetar professionellt med många års erfarenhet i branschen och vi tillhandahåller alla redskap och rengöringsmedel som behövs när vi kommer ut till er.</p><br></br>
            <p>Oavsett om du har en villa som har meterhöga och otillgängliga fönster, har vi rätt resurser för att anpassa oss till era önskemål.</p><br></br>    
            <p>Kontakta oss gärna för ytterligare information om priser från oss, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br>
            </>

        ],
        Mattvätt: [ 
            <>
            <h2>Mattvätt</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- för ett fräschare intryck</h3><br></br>
            <p>Har ni gått och tänkt på hur den där heltäckningsmattan i sovrummet behöver fräschas upp men inte gjort något? Ibland önskar man att man hade en mattvätt till hands.</p><br></br>
            <p>För att rengöra heltäckningsmatta måste man ha rätt utrustning. Rengöringen av mattorna ska vara skonsam och under själva momentet de tvättas, ska mattan bli nästintill ny. Vi har rätt utrustning och vi rekommenderar att man tar hjälp professionellt när man vill fräscha upp sina mattor.</p><br></br>
            <h3>Att höra av sig till oss på Team städservice för mattvätt kommer underlätta för att bevara mattornas kvalité och utseende</h3><br></br>
            <p>Vi hjälper dig och anpassar oss oavsett vilka önskemål du har. Vi tvättar alla typer av heltäckningsmattor, så låt oss tvätta just era mattor och ge ert hem ett lyft!</p><br></br>
            <p>Det är viktigt att svåra fläckar tas bort direkt när de uppstår, annars finns det en stor risk att mattorna blir missfärgade och det skapas senare onödigt slitage på dem. Behöver du tips om hur du själv kan underhålla dina mattor hjälper vi gärna till med rekommendationer.</p><br></br>
            <p>Vi arbetar alltid med skonsamma rengöringsmedel som anpassas till alla typer av mattor. Man kan hålla sina mattor fräscha mellan våra besök genom att använda en mjuk borste för att ta bort hår och päls från mattan. Det finns också medel för att få bort fläckar på ett skonsamt sätt. Fråga oss om du har några funderingar!</p><br></br>
            <p>Med vår långa erfarenhet och med den yrkesstolthet vi arbetar med, kan du känna dig trygg när du bokar mattvätt av oss.</p><br></br>
            <p>Kontakta oss gärna för ytterligare information om priser kring mattvättning, antigen här eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br>
            </>
        ],
        Annat: [
            <>
            <h2>Övrig Service?</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- Har du något annat önskemål? Vi löser det!</h3><br></br>
            <p>Finns det något annat som du behöver hjälp med, skriv till oss i "Övrig Information", så skall vi allt komma till en bra lösning!</p><br></br>
            </>
        ]
    })
    const [ showObj, setShowObj ] = useState(typeOfCleaning["Default"])



//*----------1-------------PICKS WHICH INFO WILL BE SHOWN-------------------
    const dropdownChange = (e) => {
        const ddValue = e
        setShowObj(typeOfCleaning[ddValue])
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        
        if(location.state){
            setShowObj(typeOfCleaning[location.state])
        }else{
            setShowObj(typeOfCleaning["Default"])
        }
    },[location.state])
//*----------1-------------PICKS WHICH INFO WILL BE SHOWN-------------------


//*----------2-------------SUBMIT AND CHANGE-------------------
    const { executeRecaptcha } = useGoogleReCaptcha();

    const dispatch = useDispatch()
    const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ formData, setFormData ] = useState({
        service:"Privatperson",
        firstname:"",
        lastname:"",
        company:"none",
        email:"",
        number:"",
        type:"",        
        other:"",
        token:""
    })

    /*---------3--------------RECAPTCH VERIFY-------------------*/
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
    /*---------3--------------RECAPTCH VERIFY-------------------*/

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

        dispatch(servicePosts(sendData))
            .then(unwrapResult)
            .then(res => {
                console.log("response careerPosts: ",res)
                if(res.success && !res.err){
                    setErrorMessage("Tack så mycket för ditt mail, vi kommer svara dig så fort vi kan!")
                }else{
                    setErrorMessage(<><p style={{color:"red"}}>Ursäkta men något gick fel, försök igen.</p><p style={{color:"red"}}>Ibland hjälper det att updater sidan</p></>)
                }
                setFormData({
                    service:"Privatperson",
                    firstname:"",
                    lastname:"",
                    email:"",
                    number:"",
                    type:"",        
                    other:"",
                    token:""
                })
            })
    }
//*----------2-------------SUBMIT AND CHANGE-------------------

    
  return (
    <div className='container__ServicePrivate bg flex__center'>

        <div className='ServicePrivate__section'>
            
            <div className='ServicePrivate__section-form'>

                <div className='ServicePrivate__section-info'>
                    <h1>Städning för privatperson</h1>
                    <div className='title__line' ></div>                
                    <p>Vi erbjuder olika typer av städtjänster för privatpersonen, välj nedan mellan dem olika tjänsterna</p>
                </div>

                <div className='ServicePrivate__section-input'>
                    <form>
                        <label htmlFor="typeService">Vilken tjänst är du intresserad utav?*</label>
                        <select id="typeService" onChange={(e) => {dropdownChange(e.target.value);handleChange(e)} } value={formData.type} name="type" required>
                            <option value="Default">Välj typ av städservice</option>
                            <option value="Hemstäd">Hemstädning</option>
                            <option value="Fönsterputs">Fönsterputs</option>
                            <option value="Storstäd">Storstäd</option>
                            <option value="Flyttstäd">Flyttstäd</option>
                            <option value="Mattvätt">Mattvätt</option>
                            <option value="Annat">Annat</option>
                        </select>

                        <div className='ServicePrivate__section-input-name'>
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
                        <input type="tel" id="fnumber" onChange={handleChange} value={formData.number} name="number" style={{width:"150px"}} ></input>

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

            <div className='ServicePrivate__section__explain'>
                {showObj}
            </div>

        </div>

        
        
    </div>
  )
}

export default ServicePrivate