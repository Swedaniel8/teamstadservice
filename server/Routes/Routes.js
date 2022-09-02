"use strict";
import express from 'express';




import { contactPost, careerPost, servicePost  } from '../Controllers/form.js';

const router =  express.Router()

//**    POST REQUESTS
router.post("/contactpost",contactPost)
router.post("/careerpost",careerPost)
router.post("/servicepost",servicePost)


//router.post("/createPost",createPost)
//router.put("/likeCommentPost",likeCommentPost)
//router.delete("/deletePost/:postId/:AccToken",deletePost)
//router.get("/search/:data",getTagsPost)


export default router