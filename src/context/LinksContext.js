import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const LinksContext = createContext();

export const LinksContextProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "links"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLinks([]);
      querySnapshot.forEach((link) => {
        setLinks((prevLinks) => [
          { id: link.id, ...link.data() },
          ...prevLinks,
        ]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <LinksContext.Provider value={{ links, errors }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  return useContext(LinksContext);
};
