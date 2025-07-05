// ✅ Corrected routes/contactRoutes.js

import express from "express";
import {
  createContact,
  getContacts,        // ✅ this fetches all contacts
  // getContactById,     // ✅ for a specific contact by ID
  updateContact,
  deleteContact,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", createContact);           // CREATE
router.get("/", getContacts);              // ✅ READ ALL (Fix applied here)
// router.get("/", getContactById);        // ✅ READ ONE
router.put("/:id", updateContact);         // UPDATE
router.delete("/:id", deleteContact);      // DELETE

export default router;
