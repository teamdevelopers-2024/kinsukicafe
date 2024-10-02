import express from 'express'
import controller from './controller.js'
const router = express.Router()


router.get("/getCategory", controller.getCategory)

router.post("/addCategory" ,controller.addCategory)










export default router