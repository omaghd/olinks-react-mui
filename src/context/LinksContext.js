import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

const LinksContext = createContext();

export const LinksContextProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  const addEmptyLink = async () => {
    await addDoc(collection(db, "links"), {
      title: "",
      url: "",
      views: 0,
      isVisible: false,
      createdAt: Timestamp.now(),
    });
  };

  const updateLink = async (link) => {
    const linkRef = doc(db, "links", link.id);
    await updateDoc(linkRef, link);
  };

  const deleteLink = async (link) => {
    await deleteDoc(doc(db, "links", link.id));
  };

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
    <LinksContext.Provider
      value={{ links, addEmptyLink, setLinks, updateLink, deleteLink }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  return useContext(LinksContext);
};
