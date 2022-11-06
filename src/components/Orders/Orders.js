import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		const reaminingProducts = cart.filter(product => product._id !== id);
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
						key={review._id}
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
				<Cart clearCart={clearCart} cart={cart}>
					<Link to="/shipping">
						<button className="proceed-shipping">
							<p>
								Proceed shipping{" "}
								<FontAwesomeIcon
									className="icon-clear-or-revie"
									icon={faArrowRightLong}></FontAwesomeIcon>
							</p>
						</button>
					</Link>
				</Cart>
			</div>
		</div>
	);
};

export default Orders;
