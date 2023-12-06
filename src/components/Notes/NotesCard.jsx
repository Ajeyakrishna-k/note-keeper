import { useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineInvertColors } from "react-icons/md";
import { TwitterPicker } from "react-color";

import { NotesContext } from "../../contexts/NotesProvider";
import styles from "./notes.module.css";
import CustomizedDialogs from "../../material-ui-components/CustomizedDialogs";
import NotesEditForm from "./NotesEditForm";

const NotesCard = ({ note }) => {
  const { notes, setNotes } = useContext(NotesContext);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  const toggleEditDialog = () => {
    setEditDialogOpen(!isEditDialogOpen);
  };

  const toggleDeleteDialog = () => {
    setDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const toggleColorPickerDialog = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  const deleteNote = (currentNote) => {
    const updatedNotes = notes.filter((data) => data.id !== currentNote.id);
    setNotes(updatedNotes);
  };

  const handleDeleteDialogSubmit = () => {
    deleteNote(note);
    if (isDeleteDialogOpen) toggleDeleteDialog();
  };
  const handleNoteUpdate = () => {
    const updatedNotes = [];
    for (const note of notes) {
      if (note.id === currentNote.id) {
        updatedNotes.push({ ...currentNote });
      } else {
        updatedNotes.push(note);
      }
    }
    setNotes(updatedNotes);
    if (isEditDialogOpen) toggleEditDialog();
  };

  const handleColorSubmit = (color, event) => {
    if (color.hex !== currentNote.color) {
      const updatedNotes = [];
      for (const note of notes) {
        if (note.id === currentNote.id) {
          updatedNotes.push({
            ...currentNote,
            color: color.hex,
            edited: Date.now(),
          });
        } else {
          updatedNotes.push(note);
        }
      }
      setNotes(updatedNotes);
    }
    if (isColorPickerOpen) toggleColorPickerDialog();
  };

  return (
    <>
      <div style={{ backgroundColor: note.color }} className={styles.notesCard}>
        <div onClick={toggleEditDialog}>
          {!note.title && !note.content && (
            <p className={styles.notesCardDescription}>Empty Note</p>
          )}
          <p className={styles.notesCardTitle}>{note.title}</p>
          <p className={styles.notesCardDescription}>{note.content}</p>
        </div>
        <div className={styles.notesCardActions}>
          <button
            className={styles.notesCardActionsDelete}
            onClick={toggleDeleteDialog}
          >
            <MdDeleteOutline />
          </button>
          <button
            className={styles.notesCardActionsColor}
            onClick={toggleColorPickerDialog}
          >
            <MdOutlineInvertColors />
          </button>
        </div>
      </div>
      <CustomizedDialogs
        isOpen={isColorPickerOpen}
        onSubmit={toggleColorPickerDialog}
        actionButtonText={"close"}
        actionButtonColor="warning"
      >
        <TwitterPicker triangle="hide" onChangeComplete={handleColorSubmit} />
      </CustomizedDialogs>
      <CustomizedDialogs
        isOpen={isDeleteDialogOpen}
        onSubmit={handleDeleteDialogSubmit}
        onClose={toggleDeleteDialog}
        actionButtonText={"delete"}
        actionButtonColor="warning"
      >
        <h4 className={styles.notesCardActionsDeleteMessage}>
          Are you sure you want to delete this item?
        </h4>
      </CustomizedDialogs>
      <CustomizedDialogs
        isOpen={isEditDialogOpen}
        onClose={handleNoteUpdate}
        onSubmit={handleNoteUpdate}
        actionButtonText={"close"}
      >
        <NotesEditForm
          note={currentNote}
          setNote={setCurrentNote}
        ></NotesEditForm>
      </CustomizedDialogs>
    </>
  );
};

export default NotesCard;
