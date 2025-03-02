import express from 'express'

import {
    getAll,
    create,
    update
} from '../controllers/city.js'

const router = express.Router()

router.get('', getAll)
router.post('',create)
router.patch('/:id', update)

export default router;