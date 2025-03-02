import express from 'express'

import { upload } from '../middlewares.js';

// import{upload} from "../middlewares.js";

import {
    create,
    update,
    getAll,
    remove,
    getById,
    getByCatgeory,
    getByCity,
    getByBedsLt,
    getByBedsBg,
    getByBedseq,
    getByPriceLt,
    getByPriceMi,
    getByPriceBg,
    getByAdvertiser,
    getByBeds,
    createWithPic
    

} from '../controllers/apartments.js'

const router = express.Router()

router.get('', getAll)
// router.post('', upload.single('image'),create)
router.post('', create)
router.delete('/:id',remove)
router.patch('/:id',update)
// router.patch('',/*checkToken,*/update)
// router.get('/getbyid/:id', getById)
// router.get('/getById/:id',getById)
router.get('/getById/:id', getById);

router.get('/getByCatgeory/:id',getByCatgeory)
router.get('/getByCity/:id',getByCity)
// router.get('/getByCity/:id', getByCity);
router.get('/getByBedsLt/:beds',getByBedsLt)
router.get('/getByBedsBg/:beds',getByBedsBg)
router.get('/getByBedseq/:beds',getByBedseq)
// router.get('/getByPriceLt/:price',getByPriceLt)
router.get('/getByPriceLt/:price',getByPriceLt);

router.get('/getByPriceMi/:price',getByPriceMi)
router.get('/getByPriceBg/:price',getByPriceBg)
router.get('/getByAdvertiser/id',getByAdvertiser,)
router.get('/getByCity/:id', getByCity);
router.get('/getByBeds/:bed/:num',getByBeds)
// הוספת תמיכה להעלאת תמונה בנתיב.
router.post('', upload.single('image'), createWithPic);



export default router;
