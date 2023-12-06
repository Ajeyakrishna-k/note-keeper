import React from "react";
import Header from "../../components/Header";
import NotesContainer from "../../components/Notes";
import NotesProvider from "../../contexts/NotesProvider";

const Home = () => {
  return (
    <>
      <NotesProvider>
        <Header />
        <NotesContainer />
      </NotesProvider>
    </>
  );
};

export default Home;
