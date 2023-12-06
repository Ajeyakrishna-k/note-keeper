import { useContext, useRef, useState } from "react";
import { ClickAwayListener, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import { TwitterPicker } from "react-color";
import { MdOutlineInvertColors } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { NotesContext } from "../../contexts/NotesProvider";
import styles from "./notes.module.css";
import CustomizedDialogs from "../../material-ui-components/CustomizedDialogs";

const initialNote = {
  title: "",
  content: "",
  color: "",
};
const NotesInputForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { setNotes } = useContext(NotesContext);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const [note, setNote] = useState({
    ...initialNote,
    id: uuid(),
  });
  const notesFormRef = useRef();

  const updateHeight = (height) => {
    notesFormRef.current.style.minheight = height;
  };

  const toggleColorPickerDialog = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorSubmit = (color, event) => {
    const changedNote = {
      ...note,
      color: color.hex,
      edited: Date.now(),
    };
    setNote(changedNote);
    if (isColorPickerOpen) toggleColorPickerDialog();
  };

  const handleSubmit = () => {
    setIsFocused(false);
    updateHeight("30px");
    setNote({ ...initialNote, id: uuid(), created: Date.now() });
    if (note.title || note.content) {
      setNotes((prevArr) => [
        { ...note, id: uuid(), created: Date.now() },
        ...prevArr,
      ]);
    }
  };

  const onTextAreaClick = () => {
    if (!isFocused) {
      setIsFocused(true);
      updateHeight("70px");
    }
  };

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
      <ClickAwayListener onClickAway={handleSubmit}>
        <div className={styles.notesForm} ref={notesFormRef}>
          {isFocused && (
            <TextField
              placeholder="Title"
              variant="standard"
              multiline
              maxRows={Infinity}
              InputProps={{ disableUnderline: true }}
              style={{ marginBottom: 10 }}
              onChange={(e) => onTextChange(e)}
              name="title"
              value={note.title}
            />
          )}
          <TextField
            placeholder="Take a note..."
            multiline
            maxRows={Infinity}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={onTextAreaClick}
            onChange={(e) => onTextChange(e)}
            name="content"
            value={note.content}
          />
          <div className={styles.notesFormActions}>
            {isFocused && (
              <div className={styles.notesCardActionsContainer}>
                <button
                  className={styles.notesCardActionsColor}
                  style={{ color: note.color }}
                  onClick={toggleColorPickerDialog}
                >
                  <MdOutlineInvertColors />
                </button>
                <button
                  className={styles.notesCardActionsSave}
                  onClick={handleSubmit}
                >
                  <IoIosCheckmarkCircleOutline />
                </button>
              </div>
            )}
          </div>
          <CustomizedDialogs
            isOpen={isColorPickerOpen}
            onSubmit={toggleColorPickerDialog}
            actionButtonText={"close"}
            actionButtonColor="warning"
          >
            <TwitterPicker
              triangle="hide"
              onChangeComplete={handleColorSubmit}
            />
          </CustomizedDialogs>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default NotesInputForm;
