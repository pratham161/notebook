import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const noteList = [];

  const [notes, setNotes] = useState(noteList);

  // fetch all notes

  const fetchNotes = async (title, desc, tag) => {
    const url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token'),
      },
    });

      const json = await response.json()
      setNotes(json);  
  };

  //Add a note
  const adddNote = async (title, desc, tag) => {
    const url = `${host}/api/notes/addnote`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, desc, tag }),
    });

    const note = await response.json();
    
    setNotes(notes.concat(note));
     
  };

  //Delete a note
  const deleteNote =  async(id) => {
 
    const url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token'),
      },
    
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    console.log(response.json)
  };

  //Edit a note
  const editNote = async (id, title, desc, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, desc, tag }),
    });
     
     let newNotes = JSON.parse(JSON.stringify(notes));

    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    return response.json();
  };

  return (
    <noteContext.Provider value={{ notes, adddNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
