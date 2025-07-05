import Seeker from "../models/Seeker.js";
import sha1 from 'sha1'

let FetchSeeker = async(req, res)=>{
    let result = await Seeker.find();
    res.send(result);
}
let FetchSeekerById = async(req, res)=>{
    let result = await Seeker.find({_id : req.params.id });
    res.send(result);
}
let SaveSeeker = async(req, res)=>{
    delete req.body.repassword;
    req.body.password = sha1(req.body.password);
    
    let result = await Seeker.create(req.body);
    // let seeker_id = await Seeker.find()
    res.send({success: true, result});
}
let UpdateSeeker = async(req, res)=>{
    let result = await Seeker.updateMany({_id : req.params.id }, req.body);
    res.send({success: true, result});
}
let DeleteSeeker = async(req, res)=>{
    let result = await Seeker.deleteMany({_id : req.params.id });
    res.send({success: true, result});
}

export {SaveSeeker, UpdateSeeker, FetchSeekerById, FetchSeeker, DeleteSeeker};