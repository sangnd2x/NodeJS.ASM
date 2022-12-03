import axiosClient from './axiosClient';

const headers = {
  'authorization': 'Bearer ' + localStorage.getItem('token')
}

const HistoryAPI = {
	getHistoryAPI: (query) => {
		const url = `http://localhost:5000/histories${query}`;
		return axiosClient.get(url, {headers});
	},

	getDetail: (id) => {
		const url = `http://localhost:5000/histories/${id}`;
		return axiosClient.get(url, {headers});
	},
};

export default HistoryAPI;
