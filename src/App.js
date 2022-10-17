import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import Inventory from "./components/Inventory/Inventory";
import Orders from "./components/Orders/Orders";
import Root from "./components/Root/Root";
import Shop from "./components/Shop/Shop";
import { productAndCartLoader } from "./loders/productAndCartLoader";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,

			children: [
				{
					path: "/",
					loader: () => fetch("products.json"),
					element: <Shop />,
				},
				{
					path: "/shop",
					loader: () => fetch("products.json"),
					element: <Shop />,
				},
				{
					path: "/orders",
					loader: productAndCartLoader,
					element: <Orders />,
				},
				{ path: "/manage-inventory", element: <Inventory /> },
				{ path: "/login", element: <Login /> },
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
