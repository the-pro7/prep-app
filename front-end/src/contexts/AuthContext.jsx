import React, { useState, useContext, useEffect } from "react";
import {auth} from "../firebase/firebase"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const provider = new GoogleAuthProvider();

	function signup(email, password) {
		createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		signOut(auth);
	}

	async function signInWithGoogle() {
		try {
			let googleAuthResult = await signInWithPopup(auth, provider);

			const credential =
				GoogleAuthProvider.credentialFromResult(googleAuthResult);
			const token = credential?.accessToken;

			let user = googleAuthResult?.user;
			setCurrentUser(user);
			console.log(user?.displayName, user?.email);
		} catch (error) {
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.error(error, credential);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	// An object of the needed values needed for the authentication
	const authValues = {
		currentUser,
		signup,
		login,
		logout,
		signInWithGoogle,
	};

	return (
		<AuthContext.Provider value={authValues}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
