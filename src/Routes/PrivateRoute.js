import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (loading) {
		return <h4 className="loding">Loading...</h4>;
	}
	if (user && user.uid) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
