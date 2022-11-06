import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import Inventory from "./components/Inventory/Inventory";
import Orders from "./components/Orders/Orders";
import Root from "./components/Root/Root";
import Shop from "./components/Shop/Shop";
import { productAndCartLoader } from "./loders/productAndCartLoader";
import Register from "./components/Register/Register";
import PrivateRoute from "./Routes/PrivateRoute";
import Shipping from "./components/Shipping/Shipping";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,

			children: [
				{
					path: "/",
					element: <Shop />,
				},
				{
					path: "/shop",
					element: <Shop />,
				},
				{
					path: "/orders",
					loader: productAndCartLoader,
					element: <Orders />,
				},
				{
					path: "/manage-inventory",
					element: (
						<PrivateRoute>
							<Inventory />
						</PrivateRoute>
					),
				},
				{
					path: "/shipping",
					element: (
						<PrivateRoute>
							<Shipping />
						</PrivateRoute>
					),
				},
				{ path: "/login", element: <Login /> },
				{ path: "/register", element: <Register /> },
			],
		},
		{
			path: "*",
			element: <Error />,
		},
	]);
	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
