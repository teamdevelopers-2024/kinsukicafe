import express from 'express'
import controller from './controller.js'
const router = express.Router()


router.get("/getCategory", controller.getCategory)
router.get("/getItems",controller.getItems)




router.post("/addCategory" ,controller.addCategory)
router.post("/addItem",controller.addItem)










export default router