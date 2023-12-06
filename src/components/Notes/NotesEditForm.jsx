import { TextField } from "@mui/material";
import styles from "./notes.module.css";

const NotesEditForm = ({ note, setNote }) => {
  const onTextChange = (e) => {
    const changedNote = {
      ...note,
      [e.target.name]: e.target.value,
      edited: Date.now(),
    };
    setNote(changedNote);
  };

  return (
    <>
      <div
        style={{ backgroundColor: note.color }}
        className={styles.notesEditForm}
      >
        <TextField
          placeholder="Title"
          variant="standard"
          multiline
          maxRows={Infinity}
          InputProps={{
            disableUnderline: true,
            className: styles.notesEditFormTitle,
          }}
          onChange={(e) => onTextChange(e)}
          name="title"
          value={note.title}
        />
        <TextField
          placeholder="Note"
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onChange={(e) => onTextChange(e)}
          name="content"
          value={note.content}
        />
      </div>
    </>
  );
};

export default NotesEditForm;
