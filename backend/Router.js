import express from 'express'
import controller from './controller.js'
const router = express.Router()


router.get("/getCategory", controller.getCategory)
router.get("/getItems",controller.getItems)
router.get("/getOrders",controller.getOrders)
router.get("/getExpenses", controller.getExpense)
router.get("/getHomeData",controller.getHomeData)
router.get("/getLatestIncome",controller.getLatestIncome)


router.post("/addCategory" ,controller.addCategory)
router.post("/addItem",controller.addItem)
router.post("/addOrder",controller.addOrder)
router.post("/addExpense",controller.addExpense)










export default router