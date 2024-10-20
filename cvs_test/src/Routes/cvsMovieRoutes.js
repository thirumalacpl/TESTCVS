//const express = require("express");
import express from 'express';
import {getMovieEditors} from '../controllers/cvsMovieController.js'

const router = express.Router();

router.get("/getMovieEditors", getMovieEditors);


export default router;