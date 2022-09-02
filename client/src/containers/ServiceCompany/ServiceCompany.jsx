import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useLocation } from 'react-router-dom';

import { servicePosts } from '../../slices/apiReducer'

import { images } from '../../constants/images'
import './ServiceCompany.css'
const ServiceCompany = () => {
    const location = useLocation();
    const jobArr = ["Butiksstädning","Byggstädning","Industristädning","Kontorsstädning","Trappstädning","Vaktmästeri/Fastighetsservice","Entrémattor","Fruktkorg","Kontorsmaterial/Förbrukningsmaterial","Annat"]
    const [ typeOfCleaning, setTypeOfCleaning ] = useState({
        Default: [
            <>
            <h2>Företagsstädning</h2>
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
        Butiksstädning: [
            <>
            <h2>Butiksstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- vi gör din butik skinande ren</h3><br></br>
            <p>Hur ni än vill att vi utför städningen i er butik så anpassar vi oss efter era önskemål!</p><br></br>
            <h3>Vi på Team städservice erbjuder många former av butiksstädning</h3><br></br>
            <p>Vi utför städning i matbutiker, café och klädbutiker. Eftersom att alla kräver olika typer av butiksstäd anpassar vi oss efter vad du som kund har för särskilda önskemål. Allt för att du som kund ska känna dig nöjd och trygg med vår service.</p><br></br>
            <p>Det kan finnas olika krav kring hur det behöver rengöras och städas när man rengör en butik som hanterar chark- och matvaror. Det samma gäller i en mataffär och då desinficerar vi självklart maskiner, bänkar, kylar och golv efter rekommenderade riktlinjer. Hygienen är en oerhört viktigt prioritet för oss.</p><br></br>
            <p>Om du vill boka butiksstädning till en klädaffär, kan det finnas andra önskemål som ni kanske vill att vi lägger större vikt vid. Exempel på detta kan vara ett välstädat och skinande rent provrum är viktigt för er? Noggrann dammsugning och ett glänsande golv är också något som bidrar till den känsla ni vill att en kund ska känna, efter att de besökt er klädbutik.</p><br></br>
            <p>Vi på Team städservice brukar vanligtvis utföra butiksstädning tidigt på morgonen eller sent på kvällen, för att inte kollidera med öppettider eller annan personal. Men om ni har andra önskemål kan vi självklart möta dom. Vi anpassar alltid vår personalstyrka efter ert önskemål och utför butiksstädningen så effektivt som möjligt.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring butiksstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br>
            </>
        ],
        Byggstädning: [
            <>
            <h2>Byggstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>– vi hjälper dig till en dammfri byggplats</h3><br></br>
            <p>Vi på Team städservice vet att något av det absolut viktigaste vid byggstädning är att vi utför städningen med yttersta noggrannhet. Att kunna vara lyhörd och flexibel är en viktig egenskap som behövs och den har vi såklart med oss när vi städar ute hos er på byggarbetsplatsen.</p><br></br>
            <p>Det är många människor i rörelse och man kan behöva justera saker i sista sekunden. Det viktigaste är att nå ett dammfritt resultat!</p><br></br>
            <h3>Här är vi rätt företag för just er byggstädning!</h3><br></br>
            <p>Vi har som rutin att alltid dammsuga och fukttorka alla ytor på byggarbetsplatsen och vi har de resurser som krävs för att kunna hjälpa er med byggstädningen med kort varsel. Vi utför både grovstädning och finstädning efter era önskemål.</p><br></br>
            <p>Under en grovstädning så rensar vi bort större föremål och material som gips eller kartong. Det här blir den grundläggande städningen som förbereder för finstädet. Det ska inte finnas kvar någonting på byggplatsen, utan det behöver vara skinande rent om det är en besiktningsman som ska granska byggets kvalité och liknande.</p><br></br>
            <p>Under en finstädning görs de allra mest noggranna detaljer av städningen. Vi städar undan allt som kan finnas kvar efter de större föremålen är bortplockade. Papper, små kartongbitar, plast eller tejp som sitter kvar. Det viktiga med en finstädning är att det inte finns kvar några spår av att ett bygge precis blivit färdigt, för att lämna allting på bästa sätt för den som ska flytta in.</p><br></br>    
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring byggstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Industristädning: [
            <>
            <h2>Industristädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>– vi rengör efter era unika önskemål</h3><br></br>
            <h3>Vi på Team städservice vet att många industrier har en unik miljö och att det finns särskilda krav för att industristädningen ska bli bra.</h3><br></br>
            <p>Med industristädning vet vi att olika maskinparker kan behöva städning med särskilda maskiner och vi arbetar alltid ändamålsenligt. Det är viktigt att det ska hållas rent kring maskiner och man måste kunna vara säker på att all städning utförs korrekt.</p><br></br>
            <p>Eftersom att våra medarbetare har lång erfarenhet av industristädning kan vi anpassa oss till era önskemål och ni kan vara trygga när ni väljer oss för städning av er industrilokal.
Vi städar i större industrilokaler men lika ofta i mindre lagerlokaler. Vare sig du har en verkstadsindustri eller livsmedelsindustri så kan vi hjälpa till.</p><br></br>
            <h3>När du bokar industristädning från oss på Team städservice ser vi alltid till att era önskemål blir riktlinjer för hur vi utför städningen.</h3><br></br>
            <p>Både när det kommer till specifika tider eller under hur många gånger per vecka eller månad ni vill ha service från oss.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring industristädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Kontorsstädning: [
            <>
            <h2>Kontorsstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>– vi gör ditt kontor mer trivsamt</h3><br></br>
            <p>Vårt mål är att alla som köper kontorsstädning av oss på Team städservice, får möjlighet att kunna starta dagen vid ett nystädat skrivbord, i en väldoftande miljö.
    Vad passar bättre än att kunna ta en kopp kaffe med kollegorna i ett kök, som inte bara luktar fräscht, utan också skiner rent? Visst känns det som en härlig start på arbetsdagen?</p><br></br>
            <h3>Vad innebär kontorsstädning?</h3><br></br>
            <p>Allt som kan tänkas behövas göras på ett kontor, dammsuga, tvätta fönster, tömma papperskorgar och mattvätt. Har ni önskemål om att vi tar hand om all påfyllning av förbrukningsmaterial eller vattnar blommor?. Vi löser det och mycket mer!</p><br></br>
            <p>Vi hjälper er med det och allt annat som kan tänkas behövas vid kontorsstädning. Det är helt upp till dig som kund att kunna välja hur vår service anpassas till er, efter era arbetstider, önskemål och rutiner.</p><br></br>
            <p>Vi erbjuder kontorsstädning på precis det sättet du önskar och som passar er verksamhet allra bäst. Vi städar och rengör ert kontor före, under eller efter arbetstid.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring Kontorsstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            
            </>

        ],
        Trappstädning: [
            <>
            <h2>Trappstädning</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>– för en trivsammare boendemiljö</h3><br></br>
            <h3>Är du fastighetsägare eller har du en bostadsrättsförening och behov av trappstädning?</h3><br></br>
            <p>Vi på Team städservice utför trappstädning av alla slag och hjälper er miljö att bli både fräschare och mer trivsam! Genom att städa trapphuset regelbundet motverkar man onödigt slitage och trapphuset ser fräschare ut i längden. Bra på sikt, med andra ord!</p><br></br>
            
            <h3>Du väljer själv om du vill att vi trappstädar en gång i veckan eller oftare.</h3><br></br>
            <p>Vi anpassar oss om du exempelvis har önskemål om att vi rengör entrén eller foajén extra mellan våra uppdrag. Under vintertid kan vi varmt rekommendera mer frekvent trappstädning.</p><br></br>
            <p>Att få bort grus, slask och salt regelbundet kan underlätta mycket, då det ofta samlas i entrén och uppe i trappan. Under vinterhalvåret kan det behövas rengöras ännu mer grundligt i trapphuset.</p><br></br>
            <p>När du bokar trappstädning med oss på Team städservice rengör vi inte bara trappan och entrén utan med oss ingår torkning av räcken, putsning av rostfria detaljer och städning av hiss. Vi rengör självklart element, väggar och golv. Det ska inte bara vara rent i trappan, det är minst lika viktigt att boende och besökare känner att allting i trapphuset är rent och doftar fräscht.</p><br></br>
            <p>Med vår långa erfarenhet och med den yrkesstolthet vi har, kan du känna dig trygg när du bokar oss för att utföra trappstädning hos er.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring trappstädning, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Vaktmästeri_Fastighetsservice: [
            <>
            <h2>Vaktmästeri/Fastighetsservice</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- känn Er trygga när du anlitar oss för att sköta Era fastigheter</h3><br></br>
            <p>Är du en bostadsrättsförening och behöver hjälp med fastighetsservice och/eller vaktmästeritjänster har du hamnat rätt.</p><br></br>
            <p>Vi på Team Städservice kan samordna enklare reparationer, namnbyte på dörrar, utdelning av hyresavier, snöröjning, sopning, sandning och gräsklippning med mera.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring fastighetsservice, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Entrémattor: [
            <>
            <h2>Entrémattor</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- entrémattor för alla typer av verksamheter</h3><br></br>
            <p>Är du intresserad av en entrématta till ditt kontor eller din verksamhet? Vi kan leverera mattor till dig och vi erbjuder även tvätt och byte av matta. Är du intresserad av din logotyp på mattan löser vi självklart det också.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring entrémattor, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Fruktkorg: [
            <>
            <h2>Fruktkorg</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- öka produktiviteten med en fruktkorg</h3><br></br>
            <p>Frukt är gott och nyttigt och påverkar personalens hälsa och arbetsmiljön i positiv riktning. Dessutom luktar det gott med fräsch frukt och ger ökad trivsel.</p><br></br>
            <p>Vi erbjuder fruktkorgar anpassade helt efter dina önskemål. Vill du ha ekologisk frukt, frukt varje eller varannan vecka, en eller olika sorters frukt? Oavsett har vi fruktkorgen till dig.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring fruktkorgar, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
            <p>Välkomna önskar vi på Team städservice!</p><br></br> 
            </>
        ],
        Kontorsmaterial_Förbrukningsmaterial: [
            <>
            <h2>Kontorsmaterial</h2>
            <div className='title__line' style={{width:"150px"}}></div>
            <h3>- Allt som ditt kontor och anställda behöver!</h3><br></br>
            <p>Team Städservice kan hjälpa till med leverans av kontorsmaterial såsom färgpatroner och kontorspapper. Vi kan dessutom ta ett helhetsansvar och sköta all leverans av förbrukningsmaterial till ditt kontor. Från plastmuggar och toalettpapper till maskindiskmedel.</p><br></br>
            <p>Varmt välkommen att kontakta oss för ytterligare information och om priserna kring kontorsmaterial, antigen här i formuläret eller via Kontakt fliken.</p><br></br>
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
        //Golvvård	(???????)
            //Storstäd	(ta från servicePrivate?)
            //Flyttstäd (ta från servicePrivate?)

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
    const [ formData, setFormData ] = useState({
        service:"Företagsservice",
        firstname:"",
        lastname:"",
        company:"",
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
            })
    }
//*----------2-------------SUBMIT AND CHANGE-------------------
    
  return (
    <div className='container__ServiceCompany bg flex__center'>
        
        <div className='ServiceCompany__section'>
            
            <div className='ServiceCompany__section-form'>

                <div className='ServiceCompany__section-info'>
                    <h1>Städning för företag</h1>
                    <div className='title__line' style={{width:"270px"}}></div>                
                    <p>Vi erbjuder olika typer av städtjänster för stora som små företag, välj nedan mellan dem olika tjänsterna</p>
                </div>

                <div className='ServiceCompany__section-input'>
                    <form>
                        <label htmlFor="typeService">Vilken tjänst är du intresserad utav?*</label>
                        <select id="typeService" onChange={(e) => {dropdownChange(e.target.value);handleChange(e)} } value={formData.type} name="type" required>
                            <option value="Default">Välj typ av städservice</option>
                            <option value="Butiksstädning">Butiksstädning</option>
                            <option value="Byggstädning">Byggstädning</option>
                            <option value="Industristädning">Industristädning</option>
                            <option value="Kontorsstädning">Kontorsstädning</option>
                            <option value="Vaktmästeri_Fastighetsservice">Vaktmästeri/Fastighetsservice</option>
                            <option value="Entrémattor">Entrémattor</option>
                            <option value="Fruktkorg">Fruktkorg</option>
                            <option value="Kontorsmaterial_Förbrukningsmaterial">Kontorsmaterial/Förbrukningsmaterial</option>
                            <option value="Trappstädning">Trappstädning</option>
                            <option value="Annat">Annat</option>
                        </select>

                        <div className='ServiceCompany__section-input-name'>
                            <div>
                                <label htmlFor="fname1">Förnamn*</label>
                                <input type="text" id="fname1" onChange={handleChange} value={formData.firstname} name="firstname" required></input>
                            </div>
                            <div>
                                <label htmlFor="fname2">Efternamn*</label>
                                <input type="text" id="fname2" onChange={handleChange} value={formData.lastname} name="lastname" required></input>
                            </div>
                        </div>

                        <label htmlFor="fcom">Företag*</label>
                        <input type="text" id="fcom" onChange={handleChange} value={formData.company} name="company" required></input>

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
            </div>

            <div className='ServiceCompany__section__explain'>
                {showObj}
            </div>

        </div>

        
        
    </div>
  )
}

export default ServiceCompany