import express from 'express'

import {
    register,
    login,
    getAll,
    update,
    addTokensToAdvertisers
} 
from '../controllers/advertiser.js'


const router = express.Router()

router.get('', getAll)
router.post('/register', register)
router.post('/login',login)
router.patch('/:id', update)
router.patch('/:id', addTokensToAdvertisers)


export default router;