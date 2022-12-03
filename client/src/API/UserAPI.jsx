import axiosClient from './axiosClient';

const UserAPI = {
	// getAllData: () => {
	// 	const url = 'http://localhost:5000/users';
	// 	return axiosClient.post(url);
	// },

  postLogin: (data) => {
		const url = 'http://localhost:5000/users';
		return axiosClient.post(url, data);
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},

	postSignUp: (query) => {
		const url = `http://localhost:5000/signup/${query}`;
		return axiosClient.post(url);
	},
};

export default UserAPI;
