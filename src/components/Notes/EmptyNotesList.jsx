import { MdLightbulbOutline } from "react-icons/md";
import styles from "./notes.module.css";

const EmptyNotesList = () => {
  return (
    <>
      <div className={styles.notesListEmpty}>
        <MdLightbulbOutline className={styles.notesListEmptyBulb} />{" "}
        <h1 className={styles.notesListEmptyMessage}>
          Notes you add appear here
        </h1>
      </div>
    </>
  );
};

export default EmptyNotesList;
