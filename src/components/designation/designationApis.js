import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getDesignation = async () => {
	const { data } = await axios.get(`designation?query=all`);

	return data;
};
