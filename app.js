
import express from 'express';
import allRoutes from './routes/allRoutes.js';
import ownerProfileRoutes from './routes/OwnerProfileRoutes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express(); 

// This code for deployment ---start---
const root = path.join(path.resolve(), 'dist');
app.use(express.static(root));
// This code for deployment ---end---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.resolve() + "/assets"));

app.use(allRoutes);
app.use("/api/v1/owner-profile", ownerProfileRoutes);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(path.resolve(), 'dist') }  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Running on port", port);
});
