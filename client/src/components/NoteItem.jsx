import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.desc}</p>
          <button
            className="bi bi-trash"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></button>
          <button
            className="bi bi-pencil-square"
            onClick={() => {
              updateNote(note);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
