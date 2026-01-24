// import { createContext, useContext, useEffect, useState } from 'react';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from 'firebase/auth';
// import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
// import { auth, db } from '../firebase/firebaseConfig';
// import toast from 'react-hot-toast';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const ref = doc(db, 'users', firebaseUser.uid);
//         const snap = await getDoc(ref);
//         if (snap.exists()) {
//           setUser(snap.data());
//         }
//       } catch {
//         toast.error('Failed to load user');
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsub();
//   }, []);

//   const signup = async (email, password, name) => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(res.user, { displayName: name });

//       const userData = {
//         uid: res.user.uid,
//         name,
//         email,
//         role: 'user',
//         age: '',
//         phone: '',
//         gender: '',
//         address: '',
//         loginTime: null,
//         logoutTime: null,
//         createdAt: serverTimestamp(),
//       };

//       await setDoc(doc(db, 'users', res.user.uid), userData);
//       setUser(userData);

//       toast.success('Account created');
//       return { success: true };
//     } catch (e) {
//       toast.error(e.message);
//       return { success: false };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await signInWithEmailAndPassword(auth, email, password);

//       await updateDoc(doc(db, 'users', res.user.uid), {
//         loginTime: serverTimestamp(),
//       });

//       toast.success('Logged in');
//       return { success: true };
//     } catch (e) {
//       toast.error(e.message);
//       return { success: false };
//     }
//   };

//   const logout = async () => {
//     try {
//       if (user?.uid) {
//         await updateDoc(doc(db, 'users', user.uid), {
//           logoutTime: serverTimestamp(),
//         });
//       }

//       await signOut(auth);
//       setUser(null);
//       toast.success('Logged out');
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUser(snap.data());
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // SIGNUP
  const signup = async (form) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);

      await updateProfile(res.user, { displayName: form.name });

      const userData = {
        uid: res.user.uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        address: form.address,
        role: 'user',
        createdAt: serverTimestamp(),
        loginTime: null,
        logoutTime: null,
      };

      await setDoc(doc(db, 'users', res.user.uid), userData);
      setUser(userData);

      toast.success('Account created');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const ref = doc(db, 'users', res.user.uid);
      await updateDoc(ref, {
        loginTime: serverTimestamp(),
      });

      toast.success('Logged in');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      if (user?.uid) {
        await updateDoc(doc(db, 'users', user.uid), {
          logoutTime: serverTimestamp(),
        });
      }

      await signOut(auth);
      setUser(null);
      toast.success('Logged out');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
