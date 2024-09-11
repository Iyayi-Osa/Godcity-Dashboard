import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

// Create the context
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		// Fetch user data from cookies on initial render
		const storedUser = Cookies.get("USER");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (userData) => {
		// Save user data to state and cookies
		setUser(userData);
		Cookies.set("USER", JSON.stringify(userData), { expires: 7 }); // 7 days expiration
	};

	const logout = () => {
		// Clear user data from state and cookies
		setUser(null);
		Cookies.remove("USER");
		Cookies.remove("TOKEN");
	};

	// Define role and calculate it based on the user object
	const role = useMemo(() => user?.role || null, [user]);
	const isAdmin = useMemo(() => role === "admin", [role]);
	const isMember = useMemo(() => role === "member", [role]);

	const contextValue = useMemo(
		() => ({ user, login, logout, loading, role, isAdmin, isMember }),
		[user, loading, role, isAdmin, isMember]
	);

	return (
		<AuthContext.Provider value={contextValue}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
