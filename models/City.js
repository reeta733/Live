import mongoose from "mongoose";
const CitySchema = mongoose.Schema(
  {
    id: String,
    name: String,
    state: String,
  },
  { collection: "City" }
);

let City = mongoose.model("City",CitySchema)
export default City;
