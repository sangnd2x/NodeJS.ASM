import axiosClient from './axiosClient';

const headers = {
  'authorization': 'Bearer ' + localStorage.getItem('token')
}

const CartAPI = {
	getCarts: (query) => {
		const url = `http://localhost:5000/carts${query}`;
		return axiosClient.get(url, {headers});
	},

	postAddToCart: (data) => {
		const url = `http://localhost:5000/add-to-cart/`;
		return axiosClient.post(url, JSON.stringify(data), {headers});
	},

	deleteToCart: (query) => {
		const url = `/carts/delete${query}`;
		return axiosClient.delete(url);
	},

	putToCart: (query) => {
		const url = `/carts/update${query}`;
		return axiosClient.put(url);
	},
};

export default CartAPI;
