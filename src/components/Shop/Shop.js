import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
	addToDb,
	deleteShoppingCart,
	getStoredCard,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

import "./Shop.css";
const Shop = () => {
	const [cart, setCart] = useState([]);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(12);
	const pages = Math.ceil(count / size);
	useEffect(() => {
		const url = `http://localhost:5000/products?page=${page}&size=${size}`;
		fetch(url)
			.then(res => res.json())
			.then(data => {
				setProducts(data.products);
				setCount(data.count);
			});
	}, [page, size]);
	const clearCart = () => {
		setCart([]);
		deleteShoppingCart();
	};

	useEffect(() => {
		const storedCart = getStoredCard();
		const saveCart = [];
		const ids = Object.keys(storedCart);
		fetch(`http://localhost:5000/productsByIds`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(ids),
		})
			.then(res => res.json())
			.then(result => {
				for (const id in storedCart) {
					const findProduct = result.find(product => product._id === id);
					if (findProduct) {
						const quantity = storedCart[id];
						findProduct.quantity = quantity;
						saveCart.push(findProduct);
					}
				}
				setCart(saveCart);
			});
	}, [products]);

	const addToCart = selectProduct => {
		let newCart = [];
		const exist = cart.find(product => product._id === selectProduct._id);
		if (!exist) {
			selectProduct.quantity = 1;
			newCart = [...cart, selectProduct];
		} else {
			const rest = cart.filter(product => product._id !== selectProduct._id);
			exist.quantity = exist.quantity + 1;
			newCart = [...rest, exist];
		}
		setCart(newCart);
		addToDb(selectProduct._id);
	};
	return (
		<div className="shop-container">
			<div className="products-container">
				{products.map(product => (
					<Product
						addToCart={addToCart}
						key={product._id}
						product={product}></Product>
				))}
			</div>
			<div className="cart-container">
				<Cart clearCart={clearCart} cart={cart}>
					<Link to="/orders">
						<button className="review-order">
							<p>
								Review Order{" "}
								<FontAwesomeIcon
									className="icon-clear-or-revie"
									icon={faArrowRightLong}></FontAwesomeIcon>
							</p>
						</button>
					</Link>
				</Cart>
			</div>
			<div
				className="pagination"
				style={{ textAlign: "center", paddingBottom: "50px" }}>
				{[...Array(pages).keys()].map(number => (
					<button
						onClick={() => setPage(number)}
						className={page === number && "selected"}
						key={number}>
						{number + 1}
					</button>
				))}
				<select onChange={e => setSize(e.target.value)}>
					<option value="5">5</option>
					<option value="10" selected>
						10
					</option>
					<option value="15">15</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</div>
		</div>
	);
};

export default Shop;
