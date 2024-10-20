//const express = require("express");
//import express from 'express';
const express = require("express");
//import {getPopulationByYear,insertMovieInList,getAllPopulationDescOrder} from '../controllers/cvsController.js'

const router = express.Router();

router.get("/getPopulationByYear", getPopulationByYear);
router.get("/getAllPopulationDescOrder", getAllPopulationDescOrder)
router.post("/insertMovie", insertMovieInList);

export default router;