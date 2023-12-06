import styles from "./header.module.css";
import { GrDocumentNotes } from "react-icons/gr";

const Header = () => {
  return (
    <header className={styles.header}>
      <GrDocumentNotes className={styles.headerLogo} />
      <h1 className={styles.headerAppName}>Notes</h1>
    </header>
  );
};

export default Header;
