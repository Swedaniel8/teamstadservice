"use strict";
import { load } from 'recaptcha-v3'
import axios from 'axios'
import nodemailer from 'nodemailer'
import Joi from 'joi'
import hummus from 'hummus';

export const contactPost = async(req, res) => {
    // VALIDATION SCHEMA
    const schema = Joi.object({
        firstname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/) // abcABCåäöÅÄÖ is allowed
            .min(1)
            .max(30)
            .required(),
        lastname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/)
            .min(1)
            .max(30)
            .required(), 
        email: Joi.string()
            .email({minDomainSegments: 2})
            .required(), 
        number: Joi.string()
            .pattern(/^[\+]?[0-9]+$/) // + (or not a plus sign) followed by 14-15 numbers
            .max(15), 
        other: Joi.string()
            .pattern(/^[.,?!%"=+*()a-zA-Z0-9\s]*$/)
            .min(0)
            .max(800), 
        token: Joi.string()
            .pattern(/^[-_a-zA-Z0-9]+$/)
            .required()
    })




    const { firstname, lastname, email, number, other, token } = req.body
    console.log("contactPost: ", req.body)
    
    try {
        const validation = await schema.validateAsync(req.body)
        
        const recaptchaRes = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        );
          
        console.log("recaptchaRes: ", recaptchaRes.data)
        if(recaptchaRes.data.score > 0.6){
     
            const mailOptions = {
                from: process.env.USER,
                to: process.env.USER,
                subject: `Kontakt, ${firstname} ${lastname}` ,
                text: `${firstname} ${lastname}                 
                \nEmail: ${email}
                \nNummer: ${number}                
                \nÖvrig information :${other}            
                `
            };
            const mailres = await sendMail(mailOptions)
            console.log("mailresponse: ",mailres)
            if(mailres.success && !mailres.err ){
                return res.json({success:true, err:null})
            }
            console.log("mailres: ",mailres)
            return res.json({success:null, err:true})
        }    
    } catch (error) {
        console.log("error career: ",error)
        return res.json({success:null, err:true})
    }
    return res.json({success:null, err:true})
}
export const careerPost = async(req, res) => {
    // VALIDATION SCHEMA
    const schema = Joi.object({
        firstname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/) // abcABCåäöÅÄÖ is allowed
            .min(1)
            .max(30)
            .required(),
        lastname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/)
            .min(1)
            .max(30)
            .required(), 
        email: Joi.string()
            .email({minDomainSegments: 2})
            .required(), 
        number: Joi.string()
            .pattern(/^[\+]?[0-9]+$/) // + (or not a plus sign) followed by 14-15 numbers
            .max(15), 
        occupation: Joi.string()
            .valid('Arbetar, tillsvidareanställning','Arbetar, tillfällig anställning','Studerar','Arbetslös','Annat')
            .required(),
        license: Joi.string()
            .valid('Ja','Nej')
            .required(),
        startDate: Joi.string()
            .isoDate()
            .required(),
        selectedFile: {
            name: Joi.string()
                .pattern(/.pdf$/)
                .required(),
            type: Joi.string()
                .valid("application/pdf")
                .required(),
            size: Joi.string()
                .required(),
            base64: Joi.string()
                .pattern(/^data:application\/pdf;base64,JVBERi0xLj[a-zA-Z0-9+/]+={0,2}$/) // regex for the specific base64 (pdf) pattern
                .required(),
            file: Joi.object(),
        },
        other: Joi.string()
            .pattern(/^[.,?!%"=+*()a-zA-Z0-9\s]*$/)
            .min(0)
            .max(800), 
        token: Joi.string()
            .pattern(/^[-_a-zA-Z0-9]+$/)
            .required()
    })
    const { firstname, lastname, email, number, occupation, license, startDate, selectedFile, other, token } = req.body
    console.log("careerPost: ", req.body)
 
    try {
        const newFile = selectedFile.base64.split(",")[1]
        const bufferPdf = Buffer.from(newFile, 'base64');
        const pdfReader = hummus.createReader(new hummus.PDFRStreamForBuffer(bufferPdf));
        const pages = pdfReader.getPagesCount();
        if(pages <= 0 || selectedFile.base64.length > 10987557){
            return res.json({success:null, error:true})
        }
    
        const validation = await schema.validateAsync(req.body)
        const recaptchaRes = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        );
        
        console.log("recaptchaRes: ", recaptchaRes.data)
        if(recaptchaRes.data.score > 0.6){
            var mailOptions = {
                from: process.env.USER,
                to: process.env.USER,
                subject: `Karriär, ${firstname} ${lastname}` ,
                text: `${firstname} ${lastname} 
                \nNuvarande position: ${occupation} 
                \nEmail: ${email}
                \nNummer: ${number}
                \nB-körkort :${license}
                \nStart datum :${startDate}
                \nÖvrig information :${other}            
                `,   
            };

            if(selectedFile) {
                mailOptions = {...mailOptions, attachments: {
                    filename: selectedFile.name,
                    path: selectedFile.base64
                    }
                }
            }
            const mailres = await sendMail(mailOptions)
            console.log("mailresponse: ",mailres)
            if(mailres.success && !mailres.err ){
                return res.json({success:true, err:null})
            }
            console.log("mailres: ",mailres)
            return res.json({success:null, err:true})
        }    
    } catch (error) {
        console.log("error career: ",error.details) //! DU FÅR ABSOLUT INTE PRINTA UT HELA ERROR MEDDELANDET, BASE64 Path/value (vilken fan det nu är) FÖR FILER ÄR FÖR LÅNGA => kommer hänga Serven. 
        return res.json({success:null, err:true})
    }
    return res.json({success:null, err:true})
    
    
}
export const servicePost = async(req, res) => {
    // VALIDATION SCHEMA
    const schema = Joi.object({
        service: Joi.string()
            .valid('Privatperson','Företagsservice')
            .required(),
        type: Joi.string()
            .valid('Butiksstädning','Byggstädning','Industristädning','Kontorsstädning','Vaktmästeri_Fastighetsservice','Entrémattor','Fruktkorg','Kontorsmaterial_Förbrukningsmaterial','Trappstädning','Hemstäd','Fönsterputs','Storstäd','Flyttstäd','Matttvätt','Annat')
            .required(),
        company: Joi.string()
            .pattern(/^[0-9a-zA-ZåäöÅÄÖ\s]+$/) // abcABCåäöÅÄÖ, white space and numbers is allowed
            .required(),
        firstname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/) // abcABCåäöÅÄÖ is allowed
            .min(1)
            .max(30)
            .required(),
        lastname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/)
            .min(1)
            .max(30)
            .required(), 
        email: Joi.string()
            .email({minDomainSegments: 2})
            .required(), 
        number: Joi.string()
            .pattern(/^[\+]?[0-9]+$/) // + (or not a plus sign) followed by 14-15 numbers
            .max(15),
        other: Joi.string()
            .pattern(/^[.,?!%"=+*()a-zA-Z0-9\s]*$/)
            .min(0)
            .max(800), 
        token: Joi.string()
            .pattern(/^[-_a-zA-Z0-9]+$/)
            .required()
    })
    const { service, type, firstname, lastname, email, number, other, token } = req.body
    console.log("servicePost: ", req.body)
    const company = req.body.company !== "none" ? `\nFöretag: ${req.body.company}` :""
    try {
        const validation = await schema.validateAsync(req.body)
        
        const recaptchaRes = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        );
        
        console.log("recaptchaRes: ", recaptchaRes.data)
        if(recaptchaRes.data.score > 0.6){
     
            const mailOptions = {
                from: process.env.USER,
                to: process.env.USER,
                subject: `${service}, ${firstname} ${lastname}` ,
                text: `${service}
                \nNamn: ${firstname} ${lastname} ${company}              
                \nEmail: ${email}
                \nVilken tjänst: ${type}
                \nNummer: ${number}                
                \nÖvrig information :${other}            
                `
            };
            
            const mailres = await sendMail(mailOptions)
            if(mailres.success && !mailres.err ){
                return res.json({success:true, err:null})
            }
            console.log("mailres: ",mailres)
            return res.json({success:null, err:true})
        }    
    } catch (error) {
        console.log("error career: ",error)
        return res.json({success:null, err:true})
    }
    return res.json({success:null, err:true})
}

const sendMail = async(mailOptions) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.USER,
            pass: process.env.PASS,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    })
    try {
        let mail = await transporter.sendMail(mailOptions)    
        console.log("mail send: ",mail)
        return {success:true, err:null}
    } catch (error) {
        console.log("error send mail: ",error)
        return {success:null, err:true}
    }

}
