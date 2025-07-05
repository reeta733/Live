import Owner from "../models/Owner.js";
import sha1 from 'sha1'

let FetchOwner = async(req, res)=>{
    let result = await Owner.find();
    res.send(result);
}
let FetchOwnerById = async(req, res)=>{
    let result = await Owner.find({_id : req.params.id });
    res.send(result);
}
let SaveOwner = async(req, res)=>{
    console.log(req.body)
    delete req.body.repassword;
    req.body.password = sha1(req.body.password);
    
    let result = await Owner.create(req.body);
    res.send({success: true, result});
}
let UpdateOwner = async(req, res)=>{
    let result = await Owner.updateMany({_id : req.params.id }, req.body);
    res.send({success: true, result});
}
let DeleteOwner = async(req, res)=>{
    let result = await Owner.deleteMany({_id : req.params.id });
    res.send({success: true, result});
}

export {SaveOwner, UpdateOwner, FetchOwnerById, FetchOwner, DeleteOwner};