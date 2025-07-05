import Prop from "../models/Property.js";
import jwt from "jsonwebtoken";
import path from "path";

let SaveProperty = async (req, res) => {
  try {
    let photo = req.files?.image;

    if (!photo) {
      return res
        .status(400)
        .send({ success: false, message: "Image file is required" });
    }

    req.body.image = photo.name;

    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided" });
    }

    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);

    if (!obj) {
      return res.status(401).send({ success: false, message: "Invalid token" });
    }

    let id = obj.id;
    req.body.owner_id = id;

    // Clean up deposit field if it's an empty string
    if (req.body.deposit === " ") {
      delete req.body.deposit;
    }

    // Parse amenities if it's a string
    if (typeof req.body.amenities === "string") {
      try {
        req.body.amenities = JSON.parse(req.body.amenities);
      } catch (err) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid amenities format" });
      }
    }

    // Ensure amenities is at least an empty object
    if (!req.body.amenities || req.body.amenities === " ") {
      req.body.amenities = {};
    }

    // Move image to upload directory
    const uploadPath = path.join(
      process.cwd(),
      "assets",
      "upload_images",
      photo.name
    );
    await photo.mv(uploadPath);

    // Create property
    await Prop.create(req.body);
    res.send({ success: true });
  } catch (err) {
    console.error("Error saving property:", err);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

let getAllProperty = async (req, res) => {
  let result = await Prop.find();
  res.send(result);
};

let getAllPropertyByOwner = async (req, res) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    if (obj) {
      let id = obj.id;
      let result = await Prop.find({ owner_id: id });
      res.send(result);
      // console.log("Owner Properties:", result);
      console.log(obj);
    } else {
      res.status(401).send({ success: false, message: "Invalid token" });
    }
  } else {
    res.send({ success: false, message: "No token provided" });
  }
};

let getAllPropertyWithOwner = async (req, res) => {
  let result = await Prop.find().populate("owner_id").exec();
  res.send(result);
};
let getAllPropertyByID = async (req, res) => {
  let id = req.params.id;
  let result = await Prop.find({ _id: id }).populate("owner_id").exec();
  res.send(result);
};

let getAllPropertyByOwnerAdmin = async (req, res) => {
  let ownerid = req.params.id;
  // console.log(ownerid);

  let result = await Prop.find({ owner_id: ownerid });
  res.send(result);
  // console.log(result[0]);
};

export {
  SaveProperty,
  getAllProperty,
  getAllPropertyByOwner,
  getAllPropertyWithOwner,
  getAllPropertyByID,
  getAllPropertyByOwnerAdmin,
};