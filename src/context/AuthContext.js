import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [profile, setProfile] = useState(null);

  const signup = async (username, email, password) => {
    setErrors([]);

    await checkUsername(username);

    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      if (!data) throw new Error("Could not complete the signup");
      await addUserDoc(data.user, username);
    } catch (e) {
      if (e.message === "Firebase: Error (auth/email-already-in-use).")
        setErrors((prevError) => [
          ...prevError,
          "This email is already in use!",
        ]);
    }
  };

  const checkUsername = async (username) => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const users = await getDocs(q);
      if (users.docs.length > 0)
        throw new Error("This username already exists!");
    } catch (e) {
      setErrors((prevError) => [...prevError, e.message]);
    }
  };

  const addUserDoc = async (user, username) => {
    try {
      let geo = await getGeo();
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        backgroundColor: "white",
        textColor: "black",
        displayVisits: false,
        isVisible: false,
        createdAt: Timestamp.now(),
        userAgent: navigator.userAgent,
        geo,
        bio: "",
      });
    } catch (e) {
      setErrors((prevError) => [...prevError, e.message]);
    }
  };

  const getGeo = async () => {
    const res = await axios.get("http://ip-api.com/json/");
    return res.data;
  };

  const login = async (email, password) => {
    setErrors([]);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e.message === "Firebase: Error (auth/user-not-found).")
        e.message = "User not found!";
      else if (e.message === "Firebase: Error (auth/wrong-password).")
        e.message = "Wrong password!";
      setErrors((prevError) => [...prevError, e.message]);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (doc) => {
        setProfile(doc.data());
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, signup, user, logout, errors, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
