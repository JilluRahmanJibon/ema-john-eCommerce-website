import React, { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const UserContext = ({ children }) => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const signWithPasswordAndEmail = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => {
			unSubscribe();
		};
	}, []);

	//  google
	const googleProvider = new GoogleAuthProvider();
	const signInWithGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};
	const AuthInfo = {
		user,
		loading,
		logOut,
		createUser,
		signWithPasswordAndEmail,
		signInWithGoogle,
	};
	return (
		<AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
	);
};

export default UserContext;
