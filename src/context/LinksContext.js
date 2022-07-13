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
  orderBy,
  where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const LinksContext = createContext();

export const LinksContextProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [publicLinks, setPublicLinks] = useState([]);

  const { user } = useAuth();

  const addEmptyLink = async () => {
    await addDoc(collection(db, "links"), {
      title: "",
      url: "",
      views: 0,
      isVisible: false,
      createdAt: Timestamp.now(),
      user_id: user.uid,
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
    const q = query(
      collection(db, "links"),
      where("user_id", "==", user.uid),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLinks([]);
      setPublicLinks([]);
      querySnapshot.forEach((link) => {
        if (link.data().isVisible && link.data().title && link.data().url) {
          setPublicLinks((prevLinks) => [
            { id: link.id, ...link.data() },
            ...prevLinks,
          ]);
        }
        setLinks((prevLinks) => [
          { id: link.id, ...link.data() },
          ...prevLinks,
        ]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return (
    <LinksContext.Provider
      value={{
        links,
        addEmptyLink,
        setLinks,
        updateLink,
        deleteLink,
        publicLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  return useContext(LinksContext);
};
