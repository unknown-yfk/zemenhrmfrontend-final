import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddShift from "./AddShift";

const Shift = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddShift />
		</div>
	);
};

export default Shift;
