import axios from "axios";
import { toast } from "react-toastify";

// Get Designation
export const getDesignation = async () => {
	const { data } = await axios.get(`designation?query=all`);

	return data;
};



export const loadSingleDesignation = async (id) => {
	//dispatching with an call back function and returning that

	try {
		const { data } = await axios.get(`designation/${id}`);
		console.log(data);
		
		return {
			data,
			// message: "Success",

		};
		//dispatching data
	} catch (error) {
		console.log(error.message);
	}
};