import http from '../http-common'

//* POST 
export const contactPost = (data) => {return http.post("/contactpost",data)}
export const careerPost = (data) => {return http.post("/careerpost",data)}
export const servicePost = (data) => {return http.post("/servicepost",data)}