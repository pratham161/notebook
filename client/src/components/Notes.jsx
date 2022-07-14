import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;

  const [note, setNote] = useState({id:"", etitle:"",edesc:"",etag:""});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNotes();
    }else{
      navigate("login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, edesc:currentNote.desc,etag:currentNote.tag});
  };

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edesc, note.etag);
    refClose.current.click();
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value});
  }

  return (
    <>
      <Addnote />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    minLength={3}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.edesc}
                    className="form-control"
                    id="edesc"
                    name="edesc"
                    onChange={onChange}
                    minLength={5}
                    required={true}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
               ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} key={note._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
