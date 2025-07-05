import Contact from "../models/Contact.js";

// CREATE
const createContact = async (req, res) => {
  try {
    // console.log(req.body);return
    
    const { username, email, message, pid, oid } = req.body;
    if (!username || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// READ ALL
const getContacts = async (req, res) => {
 
  try {
    const contacts = await Contact.find()
      .populate('pid') // to get property info (e.g., address)
      .populate('oid') // to get owner info (e.g., title, name, etc.)
      .exec();

    res.send(contacts);
   
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};


// READ ONE
const getContactById = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('pid').exec() 
    res.send(contacts)
  } catch (error) {
    res.status(500).json({ error: "Failed to get contact" });
  }
};

// UPDATE
const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Contact not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

export {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
