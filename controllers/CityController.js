import City from "../models/City.js";

let fetchCity = async (req, res) => {
    let state = req.params.state;
    let result = await City.find({ state: state });
    res.send(result)
};

let fetchState = async(req,res)=>{
    let result = await City.distinct("state");
    res.send(result);
}


export{fetchCity,fetchState}
