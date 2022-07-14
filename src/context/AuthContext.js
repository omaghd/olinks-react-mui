import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword as updatePasswordFirebase,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
        isVisible: true,
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

  const updateSettings = async (settings) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      textColor: settings.textColor,
      backgroundColor: settings.backgroundColor,
      isVisible: settings.isVisible,
      displayVisits: settings.displayVisits,
    });
  };

  const checkUser = async (email, password) => {
    let valid;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        valid = true;
      })
      .catch((error) => {
        valid = false;
      });

    return valid;
  };

  const updatePassword = async (currentPassword, newPassword) => {
    let valid = await checkUser(auth.currentUser.email, currentPassword);

    let updated = false;

    if (valid) {
      await updatePasswordFirebase(auth.currentUser, newPassword).then(() => {
        updated = true;
      });
    }

    return updated;
  };

  const updateAvatar = async (avatarFile) => {
    const storageRef = ref(
      storage,
      `avatars/${auth.currentUser.uid}/${avatarFile.name}`
    );

    const avatarRef = (await uploadBytes(storageRef, avatarFile)).ref;
    const path = await getDownloadURL(avatarRef);

    return path;
  };

  const updateProfile = async (newProfile) => {
    let profileError = null;

    await reauthenticateWithCredential(
      auth.currentUser,
      EmailAuthProvider.credential(auth.currentUser.email, newProfile.password)
    )
      .then(async () => {
        if (auth.currentUser.email !== newProfile.email)
          await updateEmail(auth.currentUser, newProfile.email).catch(
            (error) => {
              if (
                error.message === "Firebase: Error (auth/email-already-in-use)."
              )
                profileError = "Email already in use!";
              else profileError = "Failed to change email!";
            }
          );
      })
      .then(async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const tempProfile = {
          username: newProfile.username,
          bio: newProfile.bio,
          displayName: newProfile.name,
        };
        const finalProfile = newProfile.avatar
          ? { ...tempProfile, photoURL: newProfile.avatar }
          : { ...tempProfile };

        await updateDoc(userRef, finalProfile).catch((error) => {
          profileError = "Failed to update profile correctly!";
        });
      })
      .catch((error) => {
        if (
          error.message ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        )
          profileError =
            "Access to this account has been temporarily disabled due to many failed login attempts.";
        else profileError = "Wrong password!";
      });

    return profileError;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const unsubscribe = onSnapshot(
          doc(db, "users", currentUser.uid),
          (doc) => {
            setProfile(doc.data());
          }
        );
        return () => {
          unsubscribe();
        };
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        user,
        logout,
        errors,
        profile,
        updateSettings,
        updatePassword,
        updateAvatar,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
