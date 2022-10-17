import { getStoredCard } from "../utilities/fakedb";

export const productAndCartLoader = async () => {
	// get products
	const productData = await fetch("products.json");
	const products = await productData.json();
	// get cart
	const saveCart = getStoredCard();
	const initialCart = [];
	for (const id in saveCart) {
		// console.log(id);
		const addedProducts = products.find(product => product.id === id);
		// console.log(id, addedProducts);
		if (addedProducts) {
			const quantity = saveCart[id];
			addedProducts.quantity = quantity;
			initialCart.push(addedProducts);
		}
	}

	return { products, initialCart };
};
