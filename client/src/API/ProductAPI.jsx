import axiosClient from './axiosClient';

const ProductAPI = {
	getAPI: () => {
		const url = 'http://localhost:5000/products';
		return axiosClient.get(url);
	},

	getCategory: (query) => {
		const url = `/products/category${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `http://localhost:5000/products/${id}`;
		return axiosClient.get(url);
	},

	getPagination: (query) => {
		const url = `/products/pagination${query}`;
		return axiosClient.get(url);
	},
};

export default ProductAPI;
