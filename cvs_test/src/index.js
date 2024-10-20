// index.js
// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cvsMovieRoutes = require("./Routes/cvsMovieRoutes.js");

import express from 'express';
import cvsMovieRoutes from './Routes/cvsMovieRoutes.js';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import axios from 'axios';
import {getMovieEditors, getEditorsForMovie} from './controllers/cvsMovieController.js'

const app = express();
const port = 3000;

const add = (a,b)=>{
    return a+b;
}

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// TMDB API details
//const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BASE_URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
const TMDB_API_KEY = process.env.TMDB_API_KEY;


app.use("/api/cvs/movie", cvsMovieRoutes);

// const getEditorsForMovie = async (movieYearId) => {
//   try {
//     const response = await axios.get("https://datausa.io/api/data",{
//       params: {
//         "drilldowns": "Nation",
//         "measures": "Population"
//       }
//     });
//     //const editors = response.data.data;
    
//     const editors = response.data.data.filter((member) => member.Year === movieYearId).map((editor) => editor.Population);
//     console.log(editors,"---editorssss")
//     return editors;
//   } catch (error) {
//     // Return an empty array if the credits API fails
//     console.error(`Failed to fetch credits for movie ID ${movieYearId}:`, error.message);
//     return [];
//   }
// };

// Route to get movies by year and sort by descending popularity
app.get('/movies', async (req, res) => {
  const reqBody = req.body;
    // const year = req.query.year;
  // const page = req.query.page || 1;

  // if (!year || isNaN(year) || year.length !== 4) {
  //   return res.status(400).json({ error: 'Invalid year format. Please provide a year in YYYY format.' });
  // }

  try {
    // Call the Discover Movie API to get the movies for the specified year
    // const movieResponse = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    //   params: {
    //     api_key: TMDB_API_KEY,
    //     language: 'en-US',
    //     primary_release_year: year,
    //     sort_by: 'popularity.desc',
    //     page: page,
    //   }
    // });
    //console.log(reqBody,"reqbody")
    const response = await axios.get("https://datausa.io/api/data",{
      params: {
          "drilldowns": reqBody.drilldowns,
          "measures": reqBody.measures
      }
    });
    const arrObj = response.data.data;

    //const movies = movieResponse.data.results;
    const movies = response.data.data;
    //console.log( response.data.data,"--movies")

    // Map through the movies to fetch editors for each one
    const movieData = await Promise.all(movies.map(async (movie) => {
      const editors = await getEditorsForMovie(movie.Year);
      console.log(editors,"----editors index file")
      return {
        Year: movie.Year,
        Nation: movie.Nation,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        editors: editors
      };
    }));

    res.json(movieData);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies.' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export {add};