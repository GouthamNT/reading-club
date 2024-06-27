import axios, { AxiosInstance } from "axios";

export class AxiosClient {

	private static _axiosClient:AxiosInstance;

	private constructor() {
		AxiosClient._axiosClient = axios.create({
			baseURL: "http://localhost:3000/"
		});
	}

	static getInstance() {
		if (AxiosClient._axiosClient) {
			return AxiosClient._axiosClient;
		}

		new AxiosClient();

		return AxiosClient._axiosClient;
	}
}