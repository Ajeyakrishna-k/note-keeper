import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext(null);
const NOTES_KEY = "notes_1234";
const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem(NOTES_KEY);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return () => localStorage.removeItem(NOTES_KEY);
  }, [notes]);
  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
