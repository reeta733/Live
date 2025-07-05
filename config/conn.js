// chaurasiyareeta81
// woV6TRsQnvkeNjFN

import mongoose from "mongoose";
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("LIVE DB CONNECTED");
  })
  .catch((err) => {
    console.log("LIVE DB NOT CONNECTED", err);
  });

export default mongoose;
