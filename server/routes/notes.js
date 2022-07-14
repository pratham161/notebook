const router = require("express").Router();
const fetchUser = require("../middlewares/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/notemodel");

//Route:1 fetching all the notes created by logged in user(LOGIN REQUIRED)
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error.message);
  }
});

//Route:2 Adding notes the database with validation(LOGIN REQUIRED)
router.post(
  "/addnote",
  fetchUser,
  [
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("desc", "Description must be atleast 5 characters").isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    const { title, desc, tag } = req.body;
    // if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        //creating a new note
        title,
        desc,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error(error.message);
    }
  }
);

//Route:3 updating existing note by getting it's ID (LOGIN REQUIRED)

router.put(
  "/updatenote/:id",
  fetchUser,
  [
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("desc", "Description must be atleast 5 characters").isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    const { title, desc, tag } = req.body;
    // if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // creating a updatedNote object
      const updatedNote = {};
      if (title) {
        updatedNote.title = title;
      }
      if (desc) {
        updatedNote.desc = desc;
      }
      if (tag) {
        updatedNote.tag = tag;
      }

      // Find note to be updated and update it
      let note = await Note.findById(req.params.id);
      //checking wether the note of that id exists or not
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // checking wether the authorized user is updating the note or not
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //Now after all the checking updating the note
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updatedNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error(error.message);
    }
  }
);

//Route:4 deleting existing note by getting it's ID (LOGIN REQUIRED)
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find note to be deleted and update it
    let note = await Note.findById(req.params.id);

    //checking wether the note of that id exists or not
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // checking wether the authorized user is updating the note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Now after all the checking deleting the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted", note:note});

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error.message);
  }
});

module.exports = router;
