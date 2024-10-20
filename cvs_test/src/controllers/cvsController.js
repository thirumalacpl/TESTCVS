
import axios from "axios";

const getPopulationByYear = async(req,res)=>{
    //const reqQuery = req.query.Year;
    // console.log(reqQuery,"req query")
    const reqBody = req.body;
    console.log(reqBody,"req body")

    try {
        //const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        //const response = await axios.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population&Year=2022")
        const response = await axios.get("https://datausa.io/api/data",{
            params: {
                "drilldowns": reqBody.drilldowns,
                "measures": reqBody.measures,
                "Year":reqBody.Year
            }
          });
        console.log(response.data)
        res.status(200).send(response.data);
    } catch (error) {
        console.log(error);
    }
}

const getAllPopulationDescOrder = async(req,res)=>{
    //const reqQuery = req.query.Year;
    // console.log(reqQuery,"req query")
    const reqBody = req.body;
    console.log(reqBody,"req body")

    try {
        //const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        //const response = await axios.get("https://datausa.io/api/data?drilldowns=Nation&measures=Population&Year=2022")
        const response = await axios.get("https://datausa.io/api/data",{
            params: {
                "drilldowns": reqBody.drilldowns,
                "measures": reqBody.measures
            }
          });
        const arrObj = response.data.data;
        const arrObj2 = arrObj.sort((a,b)=>(b.Year - a.Year));
        console.log(arrObj2)
        res.status(200).send(arrObj2);
    } catch (error) {
        console.log(error);
    }
}

const insertMovieInList = async(req,res)=>{
    const Year = req.body;
    console.log(Year)
    try {
        
    } catch (error) {
        
    }
}

export {getPopulationByYear,insertMovieInList,getAllPopulationDescOrder};