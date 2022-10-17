import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./OrderReview.css";
const OrderReview = ({ review, handleRemoveFromCart }) => {
	const { img, name, price, quantity, shipping, id } = review;
	console.log(review);
	return (
		<div className="orderReview">
			<div>
				<img src={img} alt="Not Found!" />
			</div>
			<div className="item">
				<div>
					<h5>{name}</h5>
					<p>
						<span>Price:</span> <small className="color">${price}</small>
					</p>
					<p>
						<span>Shipping:</span> <small className="color">${shipping}</small>
					</p>
					<p>
						<span>Quantity:</span> <small className="color">{quantity}</small>
					</p>
				</div>
				<div>
					<button
						onClick={() => handleRemoveFromCart(id)}
						className="review-delete">
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderReview;
