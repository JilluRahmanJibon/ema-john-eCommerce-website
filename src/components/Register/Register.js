import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Register.css";

const Register = () => {
	const [error, setError] = useState(null);
	const { createUser, signInWithGoogle } = useContext(AuthContext);
	const navigate = useNavigate();
	const createUserEmailAndPassword = event => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		if (password !== confirm) {
			setError("Your password didn't match, Please try again");
		}
		if (password.length < 6) {
			setError("Your password should be at least 6 character long");
		}
		createUser(email, password)
			.then(result => {
				const user = result.user;
				form.reset();
				navigate("/");
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
				navigate("/");
			})
			.catch(error => {
				console.error("error: ", error);
			});
	};
	return (
		<div className="form-container">
			<p>{error}</p>
			<form onSubmit={createUserEmailAndPassword}>
				<h1 className="form-title">Sign Up</h1>

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
						id=""
					/>
				</div>
				<div className="form-control">
					<label htmlFor="confirm ">Confirm Password</label>
					<input
						required
						type="password"
						placeholder="confirm password"
						name="confirm"
						id=""
					/>
				</div>
				<input className="submit-btn" type="submit" value="Sign Up" />
			</form>
			<p className="login-signUp">
				{" "}
				Already have an Account? <Link to="/login">Login</Link>
			</p>
			<p className="or">-------or--------</p>
			<button onClick={continueWithGoogle} className="continueWithGoogle">
				<FcGoogle /> Continue With Google
			</button>
		</div>
	);
};

export default Register;
