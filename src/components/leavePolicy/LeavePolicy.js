import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddLeavePolicy from "./AddLeavePolicy";
import {  useTranslation } from "react-i18next";

const LeavePolicy = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<AddLeavePolicy />
		</div>
	);
};

export default LeavePolicy;
