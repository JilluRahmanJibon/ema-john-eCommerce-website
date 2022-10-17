import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Product.css";
const Product = ({ addToCart, product }) => {
	// const { addToCart, product } = props
	const { img, name, price, seller, ratings } = product;
	return (
		<div className="product">
			<img src={img ? img : "Img not found"} alt="Fashon" />
			<div className="product-info">
				<p className="product-name">{name}</p>
				<p>Price: ${price}</p>
				<p>
					<small>Seller: {seller}</small>
				</p>
				<p>
					<small>Ratig: {ratings} stars</small>
				</p>
			</div>
			<button onClick={() => addToCart(product)} className="btn-cart">
				<p>
					Add To Cart{" "}
					<FontAwesomeIcon
						className="shopping-icon"
						icon={faShoppingCart}></FontAwesomeIcon>
				</p>
			</button>
		</div>
	);
};

export default Product;
