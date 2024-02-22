import express from 'express'
import { Projects } from '../../controller/projectController.js'


const router = express.Router()
router.get('/projects', Projects)

export default router;