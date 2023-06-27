import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddLeavePolicy from "./AddLeavePolicy";

const LeavePolicy = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />
			<AddLeavePolicy />
		</div>
	);
};

export default LeavePolicy;
