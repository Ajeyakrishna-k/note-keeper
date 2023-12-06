import { useContext } from "react";
import { NotesContext } from "../../contexts/NotesProvider";
import NotesInputForm from "./NotesInputForm";
import styles from "./notes.module.css";
import NotesList from "./NotesList";
import EmptyNotesList from "./EmptyNotesList";

const NotesContainer = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div className={styles.notesContainer}>
      <NotesInputForm />
      {notes.length ? <NotesList /> : <EmptyNotesList />}
    </div>
  );
};

export default NotesContainer;
