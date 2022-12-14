import { FcGoogle } from "react-icons/fc";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../contexts/UserContext";
const Login = () => {
	const { signWithPasswordAndEmail, signInWithGoogle } =
		useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const logInWithEmailAndPassword = event => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		signWithPasswordAndEmail(email, password)
			.then(result => {
				const user = result.user;
				form.reset();
				navigate(from, { replace: true });
			})
			.catch(error => {
				console.error("error: ", error);
			});
	};

	const continueWithGoogle = () => {
		signInWithGoogle()
			.then(result => {
				const user = result.user;
				console.log(user);
				navigate(from, { replace: true });
			})
			.catch(error => {
				console.error("error: ", error);
			});
	};
	return (
		<div className="form-container">
			<form onSubmit={logInWithEmailAndPassword}>
				<h1 className="form-title">Login</h1>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input required type="email" placeholder="email" name="email" id="" />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input
						required
						type="password"
						placeholder="password"
						name="password"
						id="password"
					/>
				</div>
				<input className="submit-btn" type="submit" value="Login" />
			</form>
			<p className="login-signUp">
				{" "}
				New to Ema-john? <Link to="/register">Create New Account</Link>
			</p>
			<p className="or">-------or--------</p>
			<button onClick={continueWithGoogle} className="continueWithGoogle">
				<FcGoogle /> Continue With Google
			</button>
		</div>
	);
};

export default Login;
