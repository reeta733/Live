// import express from 'express';
// import allRoutes from './routes/allRoutes.js';
// import cors from 'cors'
// import fileUpload from 'express-fileupload';
// import path from 'path'
// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({ extended : true }));
// app.use(cors());
// app.use(fileUpload())
// app.use((express.static(path.resolve() + "/assets")));


// app.use(allRoutes);
// const port = process.env.PORT;
// app.listen(port, ()=>{
//     console.log("Server Running with port ", port);
// })



import express from 'express';
import allRoutes from './routes/allRoutes.js';
import ownerProfileRoutes from './routes/OwnerProfileRoutes.js'; // ✅ Add this
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.resolve() + "/assets"));

app.use(allRoutes); // Your existing routes
app.use("/api/v1/owner-profile", ownerProfileRoutes); // ✅ This line fixes the problem

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Running on port", port);
});
