import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	console.log(error.statusText);
	return (
		<div style={{ textAlign: "center" }}>
			<h1>{error.statusText}</h1>
			<p style={{ color: "red" }}>{error.status}</p>
		</div>
	);
};

export default Error;
