
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const getEditorsForMovie = async (movieYearId) => {
  try {
    const response = await axios.get("https://datausa.io/api/data",{
      params: {
        "drilldowns": "Nation",
        "measures": "Population"
      }
    });
    //const editors = response.data.data;
    
    const editors = response.data.data.filter((member) => member.Year === movieYearId).map((editor) => editor.Population);
    console.log(editors,"---editorssss")
    return editors;
  } catch (error) {
    // Return an empty array if the credits API fails
    console.error(`Failed to fetch credits for movie ID ${movieYearId}:`, error.message);
    return [];
  }
};


// Helper function to get movie credits
const getMovieEditors = async (movieId) => {
  console.log(movieId, "--movieId")
  const result = [];

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // console.log(__dirname);

  const filepath = path.join(__dirname, '../data/movie_credits.json')
  //console.log(filepath,"--filepath");

  // Read the JSON file
  fs.readFile(filepath, 'utf-8', (err, jsonData) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read file' });
      //return;
    }
    result.push(JSON.parse(jsonData));
    //console.log(result, "---result inside readfile")
    // Send the JSON data
    //res.json(JSON.parse(jsonData));



  //const getMovieEditors = async (req,res) => {
    try {
      // const creditsResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
      //   params: { api_key: TMDB_API_KEY },
      // });
     // console.log(JSON.parse(jsonData),"------insuide try")
      //const editors = result;
      //const editors = creditsResponse.data.crew
      // const editors = result
      //  .filter(member => member.known_for_department === 'Editing')
      //  .map(editor => editor.name);
      // console.log(editors, "---result outside try")
      const editors = JSON.parse(jsonData)
     
       //.filter(res => res.Nation === movieId);
       //.map(editor => editor.name);
      //console.log(editors[0], "---result outside try")
      if(editors){
        console.log(editors,"------editors final inside try t")
        return editors;
      }
      
  
      // Filter editors from the crew by their department
  
      //const editors = creditsResponse.data.crew
      // .filter(member => member.known_for_department === 'Editing')
      // .map(editor => editor.name);
      //res.status(200).json(result);
    } catch (error) {
      //console.error(`Failed to fetch credits for movie ID ${movieId}:`, error.message);
      console.log("error", error.message)
      return []; // Return an empty array if fetching credits fails
    }
    
  });


 
};



export { getMovieEditors, getEditorsForMovie };