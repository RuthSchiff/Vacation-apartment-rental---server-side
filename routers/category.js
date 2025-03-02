import express from 'express'

import {
    create,
    getAll,
    updateC,
} from '../controllers/category.js'

const router = express.Router()

router.get('', getAll)
router.post('', create)
router.patch('/:id', updateC)

export default router;