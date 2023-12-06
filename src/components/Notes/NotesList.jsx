import { useContext } from "react";
import { NotesContext } from "../../contexts/NotesProvider";
import styles from "./notes.module.css";
import NotesCard from "./NotesCard";

const NotesList = () => {
  const { notes } = useContext(NotesContext);
  return (
    <div className={styles.notesList}>
      {notes.map((note) => (
        <NotesCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
