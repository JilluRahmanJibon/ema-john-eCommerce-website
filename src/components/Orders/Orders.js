import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import OrderReview from "../OrderReview/OrderReview";
import "./Orders.css";
const Orders = () => {
	const { initialCart } = useLoaderData();
	const [cart, setCart] = useState(initialCart);
	const handleRemoveFromCart = id => {
		const reaminingProducts = cart.filter(product => product.id !== id);
		setCart(reaminingProducts);
		removeFromDb(id);
	};
	const clearCart = () => {
		deleteShoppingCart();
		setCart([]);
	};
	return (
		<div className="shop-container">
			<div className="orders-container">
				{cart.map(review => (
					<OrderReview
						handleRemoveFromCart={handleRemoveFromCart}
						key={review.id}
						review={review}
					/>
				))}
				{cart.length === 0 && (
					<h2 style={{ textAlign: "center" }}>
						No item added now...Please{" "}
						<Link style={{ textDecoration: "none" }} to="/shop">
							Shopping More...{" "}
						</Link>
					</h2>
				)}
			</div>
			<div className="cart-container">
				<Cart clearCart={clearCart} cart={cart} />
			</div>
		</div>
	);
};

export default Orders;
