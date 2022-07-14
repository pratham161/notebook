import {useContext,useState} from "react";
import noteContext from "../context/notes/NoteContext";
const Addnote = () => {
  const context = useContext(noteContext);
  const {adddNote} = context;

  const [note, setNote] = useState({title:"",desc:"",tag:""});


  const handleClick = (e)=>{
    e.preventDefault();
    adddNote(note.title,note.desc,note.tag);
    setNote({title: "", desc: "", tag: ""});
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value});
  }


  return (
    <div className='container my-3'>
     <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={note.title}
            className="form-control"
            id="title"
            name="title"
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
            value={note.tag}
            className="form-control"
            id="tag"
            name="tag"
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
            value={note.desc}
            className="form-control"
            id="desc"
            name="desc"
            onChange={onChange}
            minLength={5}
            required={true}
          />
        </div>
        <div className="mb-3 form-check">
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
