import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";
const Header = () => {
	const { user, logOut } = useContext(AuthContext);
	const logOutNow = () => {
		logOut()
			.then(() => {
				alert("sign out successfull");
			})
			.catch(error => {
				console.log(error);
			});
	};
	return (
		<nav className="header">
			<Link to="/">
				<img src={logo} alt="" />
			</Link>
			<div>
				<NavLink
					className={({ isActive }) => (isActive ? "active" : undefined)}
					to="/shop">
					Shop
				</NavLink>
				<NavLink to="/orders">Orders </NavLink>
				<NavLink to="/manage-inventory">Inventory</NavLink>
				{user?.uid ? (
					<Link onClick={logOutNow}>Log Out</Link>
				) : (
					<NavLink to="/login">Login</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Header;
